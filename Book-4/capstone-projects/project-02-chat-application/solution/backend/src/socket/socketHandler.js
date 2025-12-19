import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Store active connections
const activeUsers = new Map() // userId -> socketId
const typingUsers = new Map() // channelId -> Set of userIds

export const initializeSocket = (io) => {
  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token

      if (!token) {
        return next(new Error('Authentication error'))
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
          avatar: true,
          status: true
        }
      })

      if (!user) {
        return next(new Error('User not found'))
      }

      socket.user = user
      next()
    } catch (error) {
      next(new Error('Authentication error'))
    }
  })

  io.on('connection', async (socket) => {
    const user = socket.user
    console.log(`User connected: ${user.username} (${socket.id})`)

    // Store active connection
    activeUsers.set(user.id, socket.id)

    // Update user status to ONLINE
    await prisma.user.update({
      where: { id: user.id },
      data: {
        status: 'ONLINE',
        lastSeen: new Date()
      }
    })

    // Broadcast user online status
    socket.broadcast.emit('user:online', {
      userId: user.id,
      username: user.username
    })

    // Send authenticated confirmation
    socket.emit('authenticated', { user })

    // CHANNEL EVENTS
    socket.on('channel:join', async ({ channelId }) => {
      try {
        // Check if user is member
        const membership = await prisma.channelMember.findUnique({
          where: {
            channelId_userId: {
              channelId,
              userId: user.id
            }
          }
        })

        if (!membership) {
          // Auto-join if public channel
          const channel = await prisma.channel.findUnique({
            where: { id: channelId }
          })

          if (channel && !channel.isPrivate) {
            await prisma.channelMember.create({
              data: {
                channelId,
                userId: user.id,
                role: 'MEMBER'
              }
            })
          } else {
            return socket.emit('error', { message: 'Not authorized to join this channel' })
          }
        }

        // Join Socket.io room
        socket.join(channelId)

        // Notify channel members
        socket.to(channelId).emit('channel:member:joined', {
          channelId,
          user: {
            id: user.id,
            username: user.username,
            name: user.name,
            avatar: user.avatar
          }
        })

        socket.emit('channel:joined', { channelId })
      } catch (error) {
        socket.emit('error', { message: 'Failed to join channel' })
      }
    })

    socket.on('channel:leave', async ({ channelId }) => {
      try {
        socket.leave(channelId)

        // Notify channel members
        socket.to(channelId).emit('channel:member:left', {
          channelId,
          userId: user.id
        })

        socket.emit('channel:left', { channelId })
      } catch (error) {
        socket.emit('error', { message: 'Failed to leave channel' })
      }
    })

    // MESSAGE EVENTS
    socket.on('message:send', async ({ channelId, content, parentId }) => {
      try {
        // Create message in database
        const message = await prisma.message.create({
          data: {
            content,
            channelId,
            senderId: user.id,
            parentId: parentId || null
          },
          include: {
            sender: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true
              }
            },
            reactions: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true
                  }
                }
              }
            }
          }
        })

        // Broadcast to all users in channel
        io.to(channelId).emit('message:new', message)
      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' })
      }
    })

    socket.on('message:edit', async ({ messageId, content }) => {
      try {
        // Check if user owns the message
        const existingMessage = await prisma.message.findUnique({
          where: { id: messageId }
        })

        if (!existingMessage || existingMessage.senderId !== user.id) {
          return socket.emit('error', { message: 'Not authorized to edit this message' })
        }

        // Update message
        const message = await prisma.message.update({
          where: { id: messageId },
          data: {
            content,
            edited: true
          },
          include: {
            sender: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true
              }
            }
          }
        })

        // Broadcast update
        io.to(existingMessage.channelId).emit('message:updated', message)
      } catch (error) {
        socket.emit('error', { message: 'Failed to edit message' })
      }
    })

    socket.on('message:delete', async ({ messageId }) => {
      try {
        // Check if user owns the message
        const message = await prisma.message.findUnique({
          where: { id: messageId }
        })

        if (!message || message.senderId !== user.id) {
          return socket.emit('error', { message: 'Not authorized to delete this message' })
        }

        // Delete message
        await prisma.message.delete({
          where: { id: messageId }
        })

        // Broadcast deletion
        io.to(message.channelId).emit('message:deleted', {
          messageId,
          channelId: message.channelId
        })
      } catch (error) {
        socket.emit('error', { message: 'Failed to delete message' })
      }
    })

    socket.on('message:react', async ({ messageId, emoji }) => {
      try {
        // Check if reaction exists
        const existingReaction = await prisma.reaction.findUnique({
          where: {
            messageId_userId_emoji: {
              messageId,
              userId: user.id,
              emoji
            }
          }
        })

        if (existingReaction) {
          // Remove reaction
          await prisma.reaction.delete({
            where: { id: existingReaction.id }
          })
        } else {
          // Add reaction
          await prisma.reaction.create({
            data: {
              messageId,
              userId: user.id,
              emoji
            }
          })
        }

        // Get updated message with reactions
        const message = await prisma.message.findUnique({
          where: { id: messageId },
          include: {
            reactions: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true
                  }
                }
              }
            }
          }
        })

        // Broadcast reaction update
        io.to(message.channelId).emit('message:reaction', {
          messageId,
          reactions: message.reactions
        })
      } catch (error) {
        socket.emit('error', { message: 'Failed to react to message' })
      }
    })

    // TYPING INDICATORS
    socket.on('typing:start', ({ channelId }) => {
      if (!typingUsers.has(channelId)) {
        typingUsers.set(channelId, new Set())
      }
      typingUsers.get(channelId).add(user.id)

      socket.to(channelId).emit('typing:user', {
        userId: user.id,
        username: user.username,
        channelId
      })
    })

    socket.on('typing:stop', ({ channelId }) => {
      if (typingUsers.has(channelId)) {
        typingUsers.get(channelId).delete(user.id)
      }

      socket.to(channelId).emit('typing:stop', {
        userId: user.id,
        channelId
      })
    })

    // DIRECT MESSAGES
    socket.on('dm:send', async ({ recipientId, content }) => {
      try {
        // Create DM
        const dm = await prisma.directMessage.create({
          data: {
            content,
            senderId: user.id,
            recipientId
          },
          include: {
            sender: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true
              }
            }
          }
        })

        // Send to recipient if online
        const recipientSocketId = activeUsers.get(recipientId)
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('dm:new', dm)
        }

        // Confirm to sender
        socket.emit('dm:sent', dm)
      } catch (error) {
        socket.emit('error', { message: 'Failed to send direct message' })
      }
    })

    // DISCONNECT
    socket.on('disconnect', async () => {
      console.log(`User disconnected: ${user.username}`)

      // Remove from active users
      activeUsers.delete(user.id)

      // Update user status to OFFLINE
      await prisma.user.update({
        where: { id: user.id },
        data: {
          status: 'OFFLINE',
          lastSeen: new Date()
        }
      })

      // Clean up typing indicators
      typingUsers.forEach((users, channelId) => {
        if (users.has(user.id)) {
          users.delete(user.id)
          socket.to(channelId).emit('typing:stop', {
            userId: user.id,
            channelId
          })
        }
      })

      // Broadcast user offline status
      socket.broadcast.emit('user:offline', {
        userId: user.id,
        username: user.username
      })
    })
  })
}

export { activeUsers, typingUsers }

