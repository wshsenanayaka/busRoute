const crypto = require('crypto');
const pool = require('../config/db.js');
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  // Encrypt password using MD5
  const encryptedPassword = crypto.createHash('md5').update(password).digest('hex');

  const sql = 'SELECT * FROM usertb WHERE username = ? AND password = ?';
  pool.query(sql, [username, encryptedPassword], (err, results) => {
    if (err) {
      console.error('MySQL error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
        const { password, ...userWithoutPassword } = results[0]; // remove password field
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            message: 'Login successful',
            user: userWithoutPassword,
            token:token
        });
      //return res.status(200).json({ message: 'Login successful', user: results[0] });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  });
};