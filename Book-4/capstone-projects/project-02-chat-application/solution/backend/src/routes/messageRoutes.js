import express from 'express'
import {
  getChannelMessages,
  getDirectMessages,
  getDMConversations,
  searchMessages
} from '../controllers/messageController.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

router.use(authenticate)

router.get('/channels/:channelId', getChannelMessages)
router.get('/dm/:userId', getDirectMessages)
router.get('/conversations', getDMConversations)
router.get('/search', searchMessages)

export default router

