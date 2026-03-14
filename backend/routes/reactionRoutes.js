const express = require('express');
const {
  getAllReactions,
  createReaction,
  getReactionsByImageId,
  getReactionSummary,
  deleteReaction,
} = require('../controllers/reactionController');

const router = express.Router();

// GET /api/reactions - Get all reactions
router.get('/', getAllReactions);

// POST /api/reactions - Create a new reaction
router.post('/', createReaction);

// GET /api/reactions/:image_id - Get reactions for a specific image
router.get('/:image_id', getReactionsByImageId);

// GET /api/reactions-summary - Get reaction summary per image
router.get('/summary', getReactionSummary); // Note: using /summary to avoid conflict with :image_id

// DELETE /api/reactions/:id - Delete a reaction by id
router.delete('/:id', deleteReaction);

module.exports = router;