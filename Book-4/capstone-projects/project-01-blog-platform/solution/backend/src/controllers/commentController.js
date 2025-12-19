import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Get comments for a post
export const getCommentsByPost = async (req, res, next) => {
  try {
    const { postId } = req.params

    const comments = await prisma.comment.findMany({
      where: {
        postId,
        parentId: null // Only get top-level comments
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
    })

    res.json(comments)
  } catch (error) {
    next(error)
  }
}

// Create comment
export const createComment = async (req, res, next) => {
  try {
    const { postId } = req.params
    const { content, parentId } = req.body
    const authorId = req.user.userId

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId }
    })

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // If parentId provided, check if parent comment exists
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId }
      })

      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' })
      }
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId,
        parentId
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    res.status(201).json(comment)
  } catch (error) {
    next(error)
  }
}

// Update comment
export const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params
    const { content } = req.body
    const userId = req.user.userId

    // Check if comment exists and user is the author
    const existingComment = await prisma.comment.findUnique({
      where: { id }
    })

    if (!existingComment) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    if (existingComment.authorId !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this comment' })
    }

    const comment = await prisma.comment.update({
      where: { id },
      data: { content },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    res.json(comment)
  } catch (error) {
    next(error)
  }
}

// Delete comment
export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    // Check if comment exists and user is the author
    const comment = await prisma.comment.findUnique({
      where: { id }
    })

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    if (comment.authorId !== userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Not authorized to delete this comment' })
    }

    await prisma.comment.delete({
      where: { id }
    })

    res.json({ message: 'Comment deleted successfully' })
  } catch (error) {
    next(error)
  }
}

