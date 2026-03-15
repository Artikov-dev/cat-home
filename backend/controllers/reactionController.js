const { pool } = require('../config/db')

// Get reaction summary
const getReactionSummary = async (req, res) => {
  try {
    const query = `
      SELECT
        image_id,
        image_url,
        COUNT(CASE WHEN reaction_type = 'like' THEN 1 END) as likes_count,
        COUNT(CASE WHEN reaction_type = 'dislike' THEN 1 END) as dislikes_count
      FROM reactions
      GROUP BY image_id, image_url
      ORDER BY likes_count DESC, dislikes_count DESC
    `

    const result = await pool.query(query)
    res.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Error fetching reaction summary:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reaction summary'
    })
  }
}

// Add a reaction
const addReaction = async (req, res) => {
  try {
    const { image_id, image_url, reaction_type } = req.body

    if (!image_id || !image_url || !reaction_type) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: image_id, image_url, reaction_type'
      })
    }

    if (!['like', 'dislike'].includes(reaction_type)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid reaction_type. Must be "like" or "dislike"'
      })
    }

    // Insert the reaction
    const query = `
      INSERT INTO reactions (image_id, image_url, reaction_type)
      VALUES ($1, $2, $3)
      RETURNING *
    `
    const values = [image_id, image_url, reaction_type]

    const result = await pool.query(query, values)

    res.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error adding reaction:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to add reaction'
    })
  }
}

// Get reactions for a specific image
const getReactionsForImage = async (req, res) => {
  try {
    const { image_id } = req.params

    const query = `
      SELECT * FROM reactions
      WHERE image_id = $1
      ORDER BY created_at DESC
    `
    const result = await pool.query(query, [image_id])

    res.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Error fetching reactions for image:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reactions for image'
    })
  }
}

module.exports = {
  getReactionSummary,
  addReaction,
  getReactionsForImage
}