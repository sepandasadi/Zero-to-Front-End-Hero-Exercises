import express from 'express'
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  toggleBookmark
} from '../controllers/postController.js'
import { authenticate, optionalAuth } from '../middleware/auth.js'
import { validatePost } from '../middleware/validation.js'

const router = express.Router()

// Public routes
router.get('/', optionalAuth, getAllPosts)
router.get('/:slug', optionalAuth, getPostBySlug)

// Protected routes
router.post('/', authenticate, validatePost, createPost)
router.put('/:id', authenticate, validatePost, updatePost)
router.delete('/:id', authenticate, deletePost)
router.post('/:id/like', authenticate, toggleLike)
router.post('/:id/bookmark', authenticate, toggleBookmark)

export default router

