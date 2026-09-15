module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ plans: [] });
  }
  if (req.method === 'POST') {
    return res.status(501).json({ message: 'not implemented yet' });
  }
  return res.status(405).json({ message: 'method not allowed' });
};