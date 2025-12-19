import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Get user profile by username
export const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        name: true,
        bio: true,
        avatar: true,
        createdAt: true,
        _count: {
          select: {
            posts: true,
            comments: true
          }
        }
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    next(error)
  }
}

// Get user's posts
export const getUserPosts = async (req, res, next) => {
  try {
    const { username } = req.params
    const { page = 1, limit = 10 } = req.query

    const skip = (parseInt(page) - 1) * parseInt(limit)
    const take = parseInt(limit)

    // Find user
    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: {
          authorId: user.id,
          published: true
        },
        skip,
        take,
        include: {
          author: {
            select: {
              id: true,
              username: true,
              name: true,
              avatar: true
            }
          },
          categories: true,
          tags: true,
          _count: {
            select: {
              comments: true,
              likes: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.post.count({
        where: {
          authorId: user.id,
          published: true
        }
      })
    ])

    res.json({
      posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (error) {
    next(error)
  }
}

// Get user's bookmarked posts
export const getUserBookmarks = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const { page = 1, limit = 10 } = req.query

    const skip = (parseInt(page) - 1) * parseInt(limit)
    const take = parseInt(limit)

    const [bookmarks, total] = await Promise.all([
      prisma.bookmark.findMany({
        where: { userId },
        skip,
        take,
        include: {
          post: {
            include: {
              author: {
                select: {
                  id: true,
                  username: true,
                  name: true,
                  avatar: true
                }
              },
              categories: true,
              tags: true,
              _count: {
                select: {
                  comments: true,
                  likes: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.bookmark.count({
        where: { userId }
      })
    ])

    const posts = bookmarks.map(bookmark => bookmark.post)

    res.json({
      posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (error) {
    next(error)
  }
}

