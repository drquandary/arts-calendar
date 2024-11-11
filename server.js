// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create/connect to SQLite database
const db = new sqlite3.Database('.data/sqlite.db');

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
  `);
});

// API endpoints
const app = express();
app.use(express.json());

// Get all events
app.get('/api/events', (req, res) => {
  db.all('SELECT * FROM events ORDER BY date, startTime', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add new event
app.post('/api/events', (req, res) => {
  const { title, organization, date, startTime, endTime, location, category, imageUrl } = req.body;
  
  // First verify password
  if (req.body.password !== process.env.EVENT_PASSWORD) {
    res.status(401).json({ error: 'Invalid password' });
    return;
  }

  const sql = `
    INSERT INTO events (title, organization, date, startTime, endTime, location, category, imageUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.run(sql, [title, organization, date, startTime, endTime, location, category, imageUrl],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});