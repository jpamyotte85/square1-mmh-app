const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM groups';
    const params = [];
    if (type && ['AA', 'NA'].includes(type)) {
      query += ' WHERE type = $1';
      params.push(type);
    }
    query += ' ORDER BY name';
    const { rows } = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
