const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth');

// Get tracker data
router.get('/', authenticateToken, (req, res) => {
  const query = `SELECT * FROM tracker_data WHERE user_id = ?`;
  db.get(query, [req.user.id], (err, row) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(row || {});
  });
});

// Update/Create tracker data
router.post('/', authenticateToken, (req, res) => {
  const { start_date, daily_spend, daily_hours, why_statement } = req.body;
  const user_id = req.user.id;

  const checkQuery = `SELECT id FROM tracker_data WHERE user_id = ?`;
  db.get(checkQuery, [user_id], (err, row) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (row) {
      const updateQuery = `UPDATE tracker_data SET start_date = ?, daily_spend = ?, daily_hours = ?, why_statement = ? WHERE user_id = ?`;
      db.run(updateQuery, [start_date, daily_spend, daily_hours, why_statement, user_id], function(err) {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json({ message: 'Tracker updated' });
      });
    } else {
      const insertQuery = `INSERT INTO tracker_data (user_id, start_date, daily_spend, daily_hours, why_statement) VALUES (?, ?, ?, ?, ?)`;
      db.run(insertQuery, [user_id, start_date, daily_spend, daily_hours, why_statement], function(err) {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.status(201).json({ message: 'Tracker created' });
      });
    }
  });
});

// GET Daily logs for the last 30 days
router.get('/logs', authenticateToken, (req, res) => {
  const query = `SELECT * FROM daily_logs WHERE user_id = ? ORDER BY date DESC LIMIT 30`;
  db.all(query, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(rows);
  });
});

// POST a daily log
router.post('/log', authenticateToken, (req, res) => {
  const { date, status, notes } = req.body;
  const user_id = req.user.id;

  const query = `INSERT INTO daily_logs (user_id, date, status, notes) VALUES (?, ?, ?, ?)
                 ON CONFLICT(user_id, date) DO UPDATE SET status = EXCLUDED.status, notes = EXCLUDED.notes`;
  
  db.run(query, [user_id, date, status, notes], function(err) {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'Log updated successfully' });
  });
});

module.exports = router;
