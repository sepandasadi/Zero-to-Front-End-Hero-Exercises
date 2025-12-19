import { PrismaClient } from '@prisma/client'
import { generateSlug, calculateReadingTime } from '../utils/helpers.js'

const prisma = new PrismaClient()

// Get all posts (with pagination and filtering)
export const getAllPosts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      published = 'true',
      search,
      category,
      tag
    } = req.query

    const skip = (parseInt(page) - 1) * parseInt(limit)
    const take = parseInt(limit)

    const where = {
      ...(published === 'true' && { published: true }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(category && {
        categories: {
          some: { slug: category }
        }
      }),
      ...(tag && {
        tags: {
          some: { slug: tag }
        }
      })
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
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
      prisma.post.count({ where })
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

// Get single post by slug
export const getPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
            bio: true
          }
        },
        categories: true,
        tags: true,
        comments: {
          where: { parentId: null },
          include: {
            author: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true
              }
            },
            replies: {
              include: {
                author: {
                  select: {
                    id: true,
                    username: true,
                    name: true,
                    avatar: true
                  }
                }
              },
              orderBy: { createdAt: 'asc' }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            likes: true
          }
        }
      }
    })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // Increment view count
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } }
    })

    res.json(post)
  } catch (error) {
    next(error)
  }
}

// Create new post
export const createPost = async (req, res, next) => {
  try {
    const { title, content, excerpt, coverImage, published, categories, tags } = req.body
    const authorId = req.user.userId

    // Generate slug from title
    const slug = await generateSlug(title, prisma)

    // Calculate reading time
    const readingTime = calculateReadingTime(content)

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        published,
        readingTime,
        publishedAt: published ? new Date() : null,
        author: {
          connect: { id: authorId }
        },
        ...(categories && {
          categories: {
            connectOrCreate: categories.map((cat) => ({
              where: { slug: cat.toLowerCase().replace(/\s+/g, '-') },
              create: {
                name: cat,
                slug: cat.toLowerCase().replace(/\s+/g, '-')
              }
            }))
          }
        }),
        ...(tags && {
          tags: {
            connectOrCreate: tags.map((tag) => ({
              where: { slug: tag.toLowerCase().replace(/\s+/g, '-') },
              create: {
                name: tag,
                slug: tag.toLowerCase().replace(/\s+/g, '-')
              }
            }))
          }
        })
      },
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
        tags: true
      }
    })

    res.status(201).json(post)
  } catch (error) {
    next(error)
  }
}

// Update post
export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, content, excerpt, coverImage, published, categories, tags } = req.body
    const userId = req.user.userId

    // Check if post exists and user is the author
    const existingPost = await prisma.post.findUnique({
      where: { id }
    })

    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found' })
    }

    if (existingPost.authorId !== userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to update this post' })
    }

    // Calculate new reading time if content changed
    const readingTime = content ? calculateReadingTime(content) : existingPost.readingTime

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        excerpt,
        coverImage,
        published,
        readingTime,
        publishedAt: published && !existingPost.published ? new Date() : existingPost.publishedAt,
        ...(categories && {
          categories: {
            set: [],
            connectOrCreate: categories.map((cat) => ({
              where: { slug: cat.toLowerCase().replace(/\s+/g, '-') },
              create: {
                name: cat,
                slug: cat.toLowerCase().replace(/\s+/g, '-')
              }
            }))
          }
        }),
        ...(tags && {
          tags: {
            set: [],
            connectOrCreate: tags.map((tag) => ({
              where: { slug: tag.toLowerCase().replace(/\s+/g, '-') },
              create: {
                name: tag,
                slug: tag.toLowerCase().replace(/\s+/g, '-')
              }
            }))
          }
        })
      },
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
        tags: true
      }
    })

    res.json(post)
  } catch (error) {
    next(error)
  }
}

// Delete post
export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    // Check if post exists and user is the author
    const post = await prisma.post.findUnique({
      where: { id }
    })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    if (post.authorId !== userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to delete this post' })
    }

    await prisma.post.delete({
      where: { id }
    })

    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    next(error)
  }
}

// Like/unlike post
export const toggleLike = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: id,
          userId
        }
      }
    })

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          id: existingLike.id
        }
      })
      return res.json({ liked: false, message: 'Post unliked' })
    } else {
      // Like
      await prisma.like.create({
        data: {
          postId: id,
          userId
        }
      })
      return res.json({ liked: true, message: 'Post liked' })
    }
  } catch (error) {
    next(error)
  }
}

// Bookmark/unbookmark post
export const toggleBookmark = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        postId_userId: {
          postId: id,
          userId
        }
      }
    })

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark.id
        }
      })
      return res.json({ bookmarked: false, message: 'Bookmark removed' })
    } else {
      await prisma.bookmark.create({
        data: {
          postId: id,
          userId
        }
      })
      return res.json({ bookmarked: true, message: 'Post bookmarked' })
    }
  } catch (error) {
    next(error)
  }
}

