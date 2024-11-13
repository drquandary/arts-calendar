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
      password TEXT NOT NULL,
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
  // Log the entire request object
  console.log('Received request:', req);
  // Log the request headers
  console.log('Request headers:', req.headers);
  // Log the entire request body
  console.log('Received request body:', req.body);
  
  const { title, organization, date, startTime, endTime, location, category, imageUrl, password } = req.body;

  // Check if password is correct
  if (password !== 'ceelovesya') {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  const sql = `
    INSERT INTO events (title, organization, date, startTime, endTime, location, category, imageUrl, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [title, organization, date, startTime, endTime, location, category, imageUrl, password],
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

// Delete event endpoint
app.delete('/api/events/:id', (req, res) => {
  const eventId = req.params.id;
  const { password } = req.body;

  if (password !== 'ceelovesya') {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  db.run('DELETE FROM events WHERE id = ?', [eventId], (err) => {
    if (err) {
      console.error('Error deleting event:', err);
      return res.status(500).json({ error: 'Failed to delete event' });
    }
    res.json({ message: 'Event deleted successfully' });
  });
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