import sqlite3 from 'sqlite3';

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
  const { id } = req.query;

  if (req.method === 'DELETE') {
    const { password } = req.body;

    if (password !== 'ceelovesya') {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    database.run('DELETE FROM events WHERE id = ?', [id], (err) => {
      if (err) {
        console.error('Error deleting event:', err);
        return res.status(500).json({ error: 'Failed to delete event' });
      }
      res.json({ message: 'Event deleted successfully' });
    });
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}