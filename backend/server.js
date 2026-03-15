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
    'http://localhost:3000', // for local development
    'http://localhost:5173', // Vite dev server
    'https://cat-home-frontend.vercel.app', // Vercel production (update with your actual Vercel URL)
    /\.vercel\.app$/ // Allow all Vercel domains
  ],
  credentials: true
}))

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
  res.status(const ml = "https://cat-home-backend.onrender.com";
...
fetch(`${ml}/api/reactions-summary`)).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})