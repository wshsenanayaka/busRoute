const db = require('../config/db');

exports.getUsers = (req, res) => {
  db.query('SELECT * FROM bus_routetb', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};