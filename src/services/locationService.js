const pool = require('../config/db.js');

exports.getAllLocations = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM locationtb';
      pool.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results); // Return the full result set with all fields
      });
    });
};