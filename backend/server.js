require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./config/db');
const reactionRoutes = require('./routes/reactionRoutes');
const { getReactionSummary } = require('./controllers/reactionController');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reactions', reactionRoutes);

// Separate route for summary
app.get('/api/reactions-summary', getReactionSummary);

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Cat Image Backend API is running',
    endpoints: {
      'GET /api/reactions': 'Get all reactions',
      'POST /api/reactions': 'Create a new reaction',
      'GET /api/reactions/:image_id': 'Get reactions for an image',
      'GET /api/reactions-summary': 'Get reaction summary per image',
      'DELETE /api/reactions/:id': 'Delete a reaction by id',
    },
  });
});

// 404 handler for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Database connected and initialized`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();