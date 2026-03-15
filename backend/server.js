const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { initDB } = require('./config/db')
const reactionRoutes = require('./routes/reactionRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://cat-home-frontend.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}))

app.use(express.json())

// Initialize database
initDB()

// Routes
app.use('/api', reactionRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Cat Home Backend is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
