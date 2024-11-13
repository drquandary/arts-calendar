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

// Only create the table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    date TEXT NOT NULL,
    startTime TEXT NOT NULL,
    endTime TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    imageUrl TEXT,
    infoUrl TEXT,
    password TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Confirmed events table exists');
    }
  });
});

// Rest of your server code stays exactly the same...

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
  console.log('Received request:', req);
  console.log('Request headers:', req.headers);
  console.log('Received request body:', req.body);
  
  const { title, organization, date, startTime, endTime, location, category, imageUrl, infoUrl, password } = req.body;
  
  console.log('Password received:', password);

  if (password !== 'ceelovesya') {
    console.log('Password incorrect:', password);
    return res.status(401).json({ error: 'Incorrect password' });
  }

  const sql = `
    INSERT INTO events (title, organization, date, startTime, endTime, location, category, imageUrl, infoUrl, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [title, organization, date, startTime, endTime, location, category, imageUrl, infoUrl, password],
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

app.delete('/api/events/:id', (req, res) => {
  const eventId = req.params.id;
  const { password } = req.body;

  console.log('Delete attempt - Password received:', password);

  if (password !== 'ceelovesya') {
    console.log('Delete failed - Incorrect password:', password);
    return res.status(401).json({ error: 'Incorrect password' });
  }

  db.run('DELETE FROM events WHERE id = ?', [eventId], (err) => {
    if (err) {
      console.error('Error deleting event:', err);
      return res.status(500).json({ error: 'Failed to delete event' });
    }
    console.log('Event deleted successfully:', eventId);
    res.json({ message: 'Event deleted successfully' });
  });
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log('Database connection closed');
    process.exit(0);
  });
});