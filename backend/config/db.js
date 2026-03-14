const { Pool } = require('pg');

// Create PostgreSQL pool
const pool = new Pool({
  // Prefer DATABASE_URL if available (for Render or other cloud providers)
  connectionString: process.env.DATABASE_URL || undefined,
  // Fallback to individual environment variables
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // Enable SSL for Render PostgreSQL
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// Test the connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Function to initialize database (create table if not exists)
const initDB = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS reactions (
        id SERIAL PRIMARY KEY,
        image_id TEXT NOT NULL,
        image_url TEXT NOT NULL,
        reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'dislike')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(createTableQuery);
    console.log('Database initialized: reactions table created or already exists');
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }
};

module.exports = { pool, initDB };