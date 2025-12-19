import express from 'express'
import {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment
} from '../controllers/commentController.js'
import { authenticate } from '../middleware/auth.js'
import { validateComment } from '../middleware/validation.js'

const router = express.Router()

// Public routes
router.get('/posts/:postId/comments', getCommentsByPost)

// Protected routes
router.post('/posts/:postId/comments', authenticate, validateComment, createComment)
router.put('/comments/:id', authenticate, validateComment, updateComment)
router.delete('/comments/:id', authenticate, deleteComment)

export default router

