const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM meetups WHERE date >= NOW() ORDER BY date ASC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/rsvp', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;
    await db.query(
      'INSERT INTO meetup_rsvps (meetup_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [id, userId]
    );
    await db.query(
      'UPDATE meetups SET attendees = attendees + 1 WHERE id = $1',
      [id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
