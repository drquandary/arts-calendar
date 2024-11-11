// Add this at the very top of server.js
console.log('Available environment variables:', {
  VITE_EVENT_PASSWORD: process.env.VITE_EVENT_PASSWORD,
  EVENT_PASSWORD: process.env.EVENT_PASSWORD
});

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(express.json());

// Create/connect to SQLite database with better error handling
const db = new sqlite3.Database('.data/sqlite.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create events table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      organization TEXT NOT NULL,
      date TEXT NOT NULL,
      startTime TEXT NOT NULL,
      endTime TEXT NOT NULL,
      location TEXT NOT NULL,
      category TEXT NOT NULL,
      imageUrl TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Events table ready');
    }
  });
});

// API endpoints
app.get('/api/events', (req, res) => {
  console.log('GET /api/events called');
  db.all('SELECT * FROM events ORDER BY date, startTime', [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    console.log('Retrieved events:', rows);
    res.json(rows);
  });
});

app.post('/api/events', (req, res) => {
  console.log('Received event data:', req.body);
  const { title, organization, date, startTime, endTime, location, category, imageUrl, password } = req.body;
  
  // Password check logging and verification
  console.log('Server password check:', {
    provided: password,
    expected: process.env.VITE_EVENT_PASSWORD
  });

  if (password !== process.env.VITE_EVENT_PASSWORD) {
    console.log('Password verification failed');
    res.status(401).json({ error: 'Invalid password' });
    return;
  }

  // If password is correct, proceed with database insertion
  const sql = `
    INSERT INTO events (title, organization, date, startTime, endTime, location, category, imageUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.run(sql, [title, organization, date, startTime, endTime, location, category, imageUrl],
    function(err) {
      if (err) {
        console.error('Database insert error:', err);
        res.status(500).json({ error: err.message });
        return;
      }
      console.log('Event added successfully with ID:', this.lastID);
      res.json({
        id: this.lastID,
        message: 'Event added successfully'
      });
    }
  );
});

// Serve static files in production
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle cleanup on server shutdown
process.on('SIGINT', () => {
  db.close(() => {
    console.log('Database connection closed');
    process.exit(0);
  });
});