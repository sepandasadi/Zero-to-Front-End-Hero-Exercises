import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Get all channels (user is member of or public)
export const getAllChannels = async (req, res, next) => {
  try {
    const userId = req.user.userId

    const channels = await prisma.channel.findMany({
      where: {
        OR: [
          { isPrivate: false },
          {
            members: {
              some: {
                userId
              }
            }
          }
        ]
      },
      include: {
        _count: {
          select: {
            members: true,
            messages: true
          }
        },
        members: {
          where: {
            userId
          },
          select: {
            role: true,
            joinedAt: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json(channels)
  } catch (error) {
    next(error)
  }
}

// Get single channel
export const getChannelById = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    const channel = await prisma.channel.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true,
                status: true
              }
            }
          },
          orderBy: {
            joinedAt: 'asc'
          }
        },
        _count: {
          select: {
            messages: true
          }
        }
      }
    })

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' })
    }

    // Check if user has access
    const isMember = channel.members.some(m => m.userId === userId)
    if (channel.isPrivate && !isMember) {
      return res.status(403).json({ message: 'Access denied' })
    }

    res.json(channel)
  } catch (error) {
    next(error)
  }
}

// Create channel
export const createChannel = async (req, res, next) => {
  try {
    const { name, description, isPrivate } = req.body
    const userId = req.user.userId

    const channel = await prisma.channel.create({
      data: {
        name,
        description,
        isPrivate: isPrivate || false,
        creatorId: userId,
        members: {
          create: {
            userId,
            role: 'ADMIN'
          }
        }
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true
              }
            }
          }
        }
      }
    })

    res.status(201).json(channel)
  } catch (error) {
    next(error)
  }
}

// Update channel
export const updateChannel = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, description } = req.body
    const userId = req.user.userId

    // Check if user is admin
    const membership = await prisma.channelMember.findUnique({
      where: {
        channelId_userId: {
          channelId: id,
          userId
        }
      }
    })

    if (!membership || membership.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Admin access required' })
    }

    const channel = await prisma.channel.update({
      where: { id },
      data: {
        name,
        description
      }
    })

    res.json(channel)
  } catch (error) {
    next(error)
  }
}

// Delete channel
export const deleteChannel = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    // Check if user is creator or admin
    const channel = await prisma.channel.findUnique({
      where: { id },
      include: {
        members: {
          where: {
            userId,
            role: 'ADMIN'
          }
        }
      }
    })

    if (!channel || (channel.creatorId !== userId && channel.members.length === 0)) {
      return res.status(403).json({ message: 'Not authorized to delete this channel' })
    }

    await prisma.channel.delete({
      where: { id }
    })

    res.json({ message: 'Channel deleted successfully' })
  } catch (error) {
    next(error)
  }
}

// Join channel
export const joinChannel = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    // Check if channel exists and is public
    const channel = await prisma.channel.findUnique({
      where: { id }
    })

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' })
    }

    if (channel.isPrivate) {
      return res.status(403).json({ message: 'Cannot join private channel' })
    }

    // Check if already a member
    const existingMember = await prisma.channelMember.findUnique({
      where: {
        channelId_userId: {
          channelId: id,
          userId
        }
      }
    })

    if (existingMember) {
      return res.status(400).json({ message: 'Already a member of this channel' })
    }

    // Add as member
    await prisma.channelMember.create({
      data: {
        channelId: id,
        userId
      }
    })

    res.json({ message: 'Joined channel successfully' })
  } catch (error) {
    next(error)
  }
}

// Leave channel
export const leaveChannel = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    const membership = await prisma.channelMember.findUnique({
      where: {
        channelId_userId: {
          channelId: id,
          userId
        }
      }
    })

    if (!membership) {
      return res.status(400).json({ message: 'Not a member of this channel' })
    }

    await prisma.channelMember.delete({
      where: {
        id: membership.id
      }
    })

    res.json({ message: 'Left channel successfully' })
  } catch (error) {
    next(error)
  }
}

