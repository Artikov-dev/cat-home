const { pool } = require('../config/db');

// Get all reactions, ordered by newest first
const getAllReactions = async (req, res) => {
  try {
    const query = 'SELECT * FROM reactions ORDER BY created_at DESC';
    const result = await pool.query(query);
    res.status(200).json({
      success: true,
      message: 'Reactions retrieved successfully',
      data: result.rows,
    });
  } catch (err) {
    console.error('Error fetching reactions:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Create a new reaction
const createReaction = async (req, res) => {
  try {
    const { image_id, image_url, reaction_type } = req.body;

    // Validate required fields
    if (!image_id || !image_url || !reaction_type) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: image_id, image_url, reaction_type',
      });
    }

    // Validate reaction_type
    if (!['like', 'dislike'].includes(reaction_type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid reaction_type. Must be "like" or "dislike"',
      });
    }

    const query = 'INSERT INTO reactions (image_id, image_url, reaction_type) VALUES ($1, $2, $3) RETURNING *';
    const values = [image_id, image_url, reaction_type];
    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: 'Reaction saved successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error creating reaction:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Get reactions for a specific image_id
const getReactionsByImageId = async (req, res) => {
  try {
    const { image_id } = req.params;
    const query = 'SELECT * FROM reactions WHERE image_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [image_id]);

    res.status(200).json({
      success: true,
      message: 'Reactions retrieved successfully',
      data: result.rows,
    });
  } catch (err) {
    console.error('Error fetching reactions by image_id:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Get reaction summary per image
const getReactionSummary = async (req, res) => {
  try {
    const query = `
      SELECT
        image_id,
        image_url,
        COUNT(CASE WHEN reaction_type = 'like' THEN 1 END) AS likes_count,
        COUNT(CASE WHEN reaction_type = 'dislike' THEN 1 END) AS dislikes_count
      FROM reactions
      GROUP BY image_id, image_url
      ORDER BY image_id;
    `;
    const result = await pool.query(query);

    res.status(200).json({
      success: true,
      message: 'Reaction summary retrieved successfully',
      data: result.rows,
    });
  } catch (err) {
    console.error('Error fetching reaction summary:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Delete a reaction by id
const deleteReaction = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM reactions WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Reaction not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reaction deleted successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error deleting reaction:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  getAllReactions,
  createReaction,
  getReactionsByImageId,
  getReactionSummary,
  deleteReaction,
};