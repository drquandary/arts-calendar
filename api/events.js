// Simple in-memory storage for demo purposes
// In production, you'd want to use a proper database like Vercel Postgres or MongoDB
let events = [
  {
    id: 1,
    title: "Sample Art Exhibition",
    organization: "City Gallery",
    date: "2025-10-15",
    startTime: "18:00",
    endTime: "21:00",
    location: "Downtown Gallery",
    category: "Visual Arts",
    imageUrl: "",
    infoUrl: "",
    password: "ceelovesya",
    createdAt: new Date().toISOString()
  }
];

let nextId = 2;

module.exports = function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Get all events, sorted by date and time
    const sortedEvents = events
      .slice()
      .sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.startTime);
        const dateB = new Date(b.date + ' ' + b.startTime);
        return dateA - dateB;
      });

    res.json(sortedEvents);
  } else if (req.method === 'POST') {
    // Add new event
    const { title, organization, date, startTime, endTime, location, category, imageUrl, infoUrl, password } = req.body;

    if (password !== 'ceelovesya') {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const newEvent = {
      id: nextId++,
      title,
      organization,
      date,
      startTime,
      endTime,
      location,
      category,
      imageUrl: imageUrl || '',
      infoUrl: infoUrl || '',
      password,
      createdAt: new Date().toISOString()
    };

    events.push(newEvent);

    res.json({
      id: newEvent.id,
      message: 'Event added successfully'
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};