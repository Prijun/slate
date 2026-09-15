const supabase = require('../lib/supabaseClient');

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ plans: data });
  }

  if (req.method === 'POST') {
    const {
      title,
      template_type,
      notes,
      deadline,
      extra_fields
    } = req.body;

    if (!title || !template_type) {
      return res.status(400).json({ error: 'title and template_type are required' });
    }

    const { data, error } = await supabase
      .from('plans')
      .insert({
        title,
        template_type,
        notes,
        deadline,
        extra_fields
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ plan: data });
  }

  return res.status(405).end();
};