import express from 'express'
import {
  getAllChannels,
  getChannelById,
  createChannel,
  updateChannel,
  deleteChannel,
  joinChannel,
  leaveChannel
} from '../controllers/channelController.js'
import { authenticate } from '../middleware/auth.js'
import { validateChannel } from '../middleware/validation.js'

const router = express.Router()

router.use(authenticate)

router.get('/', getAllChannels)
router.post('/', validateChannel, createChannel)
router.get('/:id', getChannelById)
router.put('/:id', validateChannel, updateChannel)
router.delete('/:id', deleteChannel)
router.post('/:id/join', joinChannel)
router.post('/:id/leave', leaveChannel)

export default router

