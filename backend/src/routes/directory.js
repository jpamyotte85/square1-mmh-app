const express = require('express');
const router = express.Router();
const db = require('../db');

// Returns providers sorted by distance from user coordinates
router.get('/', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    let query;
    let params = [];

    if (lat && lng) {
      query = `
        SELECT *,
          (6371 * acos(
            cos(radians($1)) * cos(radians(latitude)) *
            cos(radians(longitude) - radians($2)) +
            sin(radians($1)) * sin(radians(latitude))
          )) AS distance_km
        FROM directory
        ORDER BY distance_km
        LIMIT 50
      `;
      params = [parseFloat(lat), parseFloat(lng)];
    } else {
      query = 'SELECT * FROM directory ORDER BY name LIMIT 50';
    }

    const { rows } = await db.query(query, params);
    res.json(rows.map((r) => ({ ...r, distanceKm: r.distance_km })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
