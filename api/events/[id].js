module.exports = function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  if (req.method === 'DELETE') {
    const { password } = req.body;

    if (password !== 'ceelovesya') {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // For demo purposes, we'll return success
    // In production, you'd delete from your database
    res.json({ message: 'Event deleted successfully' });
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};