import sqlite3 from 'sqlite3';
import { promisify } from 'util';

// Initialize database
let db;

const initDb = () => {
  if (!db) {
    db = new sqlite3.Database('/tmp/sqlite.db');

    // Create table if it doesn't exist
    const createTable = `CREATE TABLE IF NOT EXISTS events (
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
    )`;

    db.run(createTable);
  }
  return db;
};

export default function handler(req, res) {
  const database = initDb();

  if (req.method === 'GET') {
    // Get all events
    database.all('SELECT * FROM events ORDER BY date, startTime', [], (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  } else if (req.method === 'POST') {
    // Add new event
    const { title, organization, date, startTime, endTime, location, category, imageUrl, infoUrl, password } = req.body;

    if (password !== 'ceelovesya') {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const sql = `
      INSERT INTO events (title, organization, date, startTime, endTime, location, category, imageUrl, infoUrl, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    database.run(sql, [title, organization, date, startTime, endTime, location, category, imageUrl, infoUrl, password],
      function(err) {
        if (err) {
          console.error('Database insert error:', err);
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          id: this.lastID,
          message: 'Event added successfully'
        });
      }
    );
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}