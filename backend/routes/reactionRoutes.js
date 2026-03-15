const express = require('express')
const router = express.Router()
const {
  getReactionSummary,
  addReaction,
  getReactionsForImage,
  clearReactions
} = require('../controllers/reactionController')

// GET /api/reactions-summary - Get summary of all reactions
router.get('/reactions-summary', getReactionSummary)

// POST /api/reactions - Add a new reaction
router.post('/reactions', addReaction)

// POST /api/reactions/clear - Clear all reactions
router.post('/reactions/clear', clearReactions)

// GET /api/reactions/:image_id - Get reactions for a specific image
router.get('/reactions/:image_id', getReactionsForImage)

module.exports = router
