const supabase = require('../lib/supabaseClient');

let plans = [];

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ plans });
  }

  if (req.method === 'POST') {
    const { title, duration = '30 min' } = req.body || {};
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: 'title is required' });
    }

    const plan = { id: Date.now(), title: title.trim(), duration, done: false };
    plans.push(plan);
    return res.status(201).json({ plan });
  }

  return res.status(405).json({ message: 'method not allowed' });
};
