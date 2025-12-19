import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Get channel messages (with pagination)
export const getChannelMessages = async (req, res, next) => {
  try {
    const { channelId } = req.params
    const { page = 1, limit = 50, before } = req.query

    const skip = (parseInt(page) - 1) * parseInt(limit)
    const take = parseInt(limit)

    // Check if user is member
    const membership = await prisma.channelMember.findUnique({
      where: {
        channelId_userId: {
          channelId,
          userId: req.user.userId
        }
      }
    })

    if (!membership) {
      return res.status(403).json({ message: 'Not a member of this channel' })
    }

    const where = {
      channelId,
      parentId: null, // Only get top-level messages
      ...(before && {
        createdAt: {
          lt: new Date(before)
        }
      })
    }

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where,
        skip,
        take,
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
          },
          replies: {
            include: {
              sender: {
                select: {
                  id: true,
                  username: true,
                  name: true,
                  avatar: true
                }
              }
            },
            orderBy: {
              createdAt: 'asc'
            },
            take: 3 // Only get first 3 replies
          },
          _count: {
            select: {
              replies: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.message.count({ where })
    ])

    res.json({
      messages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        hasMore: skip + messages.length < total
      }
    })
  } catch (error) {
    next(error)
  }
}

// Get direct messages with a user
export const getDirectMessages = async (req, res, next) => {
  try {
    const { userId: otherUserId } = req.params
    const userId = req.user.userId
    const { page = 1, limit = 50 } = req.query

    const skip = (parseInt(page) - 1) * parseInt(limit)
    const take = parseInt(limit)

    const where = {
      OR: [
        { senderId: userId, recipientId: otherUserId },
        { senderId: otherUserId, recipientId: userId }
      ]
    }

    const [messages, total] = await Promise.all([
      prisma.directMessage.findMany({
        where,
        skip,
        take,
        include: {
          sender: {
            select: {
              id: true,
              username: true,
              name: true,
              avatar: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.directMessage.count({ where })
    ])

    // Mark messages as read
    await prisma.directMessage.updateMany({
      where: {
        senderId: otherUserId,
        recipientId: userId,
        read: false
      },
      data: {
        read: true
      }
    })

    res.json({
      messages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        hasMore: skip + messages.length < total
      }
    })
  } catch (error) {
    next(error)
  }
}

// Get DM conversations list
export const getDMConversations = async (req, res, next) => {
  try {
    const userId = req.user.userId

    // Get unique users the current user has DM'd with
    const sentMessages = await prisma.directMessage.findMany({
      where: { senderId: userId },
      select: { recipientId: true },
      distinct: ['recipientId']
    })

    const receivedMessages = await prisma.directMessage.findMany({
      where: { recipientId: userId },
      select: { senderId: true },
      distinct: ['senderId']
    })

    const userIds = [
      ...sentMessages.map(m => m.recipientId),
      ...receivedMessages.map(m => m.senderId)
    ]

    const uniqueUserIds = [...new Set(userIds)]

    // Get user details and last message
    const conversations = await Promise.all(
      uniqueUserIds.map(async (otherUserId) => {
        const [user, lastMessage, unreadCount] = await Promise.all([
          prisma.user.findUnique({
            where: { id: otherUserId },
            select: {
              id: true,
              username: true,
              name: true,
              avatar: true,
              status: true,
              lastSeen: true
            }
          }),
          prisma.directMessage.findFirst({
            where: {
              OR: [
                { senderId: userId, recipientId: otherUserId },
                { senderId: otherUserId, recipientId: userId }
              ]
            },
            orderBy: { createdAt: 'desc' }
          }),
          prisma.directMessage.count({
            where: {
              senderId: otherUserId,
              recipientId: userId,
              read: false
            }
          })
        ])

        return {
          user,
          lastMessage,
          unreadCount
        }
      })
    )

    // Sort by last message time
    conversations.sort((a, b) => {
      const aTime = a.lastMessage?.createdAt || 0
      const bTime = b.lastMessage?.createdAt || 0
      return bTime - aTime
    })

    res.json(conversations)
  } catch (error) {
    next(error)
  }
}

// Search messages
export const searchMessages = async (req, res, next) => {
  try {
    const { q, channelId } = req.query
    const userId = req.user.userId

    if (!q) {
      return res.status(400).json({ message: 'Search query required' })
    }

    const where = {
      content: {
        contains: q,
        mode: 'insensitive'
      },
      ...(channelId && {
        channelId,
        channel: {
          members: {
            some: {
              userId
            }
          }
        }
      })
    }

    const messages = await prisma.message.findMany({
      where,
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        },
        channel: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })

    res.json(messages)
  } catch (error) {
    next(error)
  }
}

