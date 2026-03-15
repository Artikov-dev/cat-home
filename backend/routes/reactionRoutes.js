const express = require('express')
const router = express.Router()
const {
  getReactionSummary,
  addReaction,
  getReactionsForImage
} = require('../controllers/reactionController')

// GET /api/reactions-summary - Get summary of all reactions
router.get('/reactions-summary', getReactionSummary)

// POST /api/reactions - Add a new reaction
router.post('/reactions', addReaction)

// GET /api/reactions/:image_id - Get reactions for a specific image
router.get('/reactions/:image_id', getReactionsForImage)

module.exports = router