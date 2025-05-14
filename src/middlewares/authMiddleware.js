// const jwt = require('jsonwebtoken');
// const SECRET = process.env.SECRET;

// exports.verifyToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];

//   if (!authHeader) return res.status(401).json({ message: 'No token provided' });

//   const token = authHeader.split(' ')[1];

//   if (!token) return res.status(403).json({ message: 'Invalid token format' });

//   jwt.verify(token, SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: 'Invalid or expired token' });

//     req.user = decoded; // Store user info from token
//     next();
//   });
// };


// const jwt = require('jsonwebtoken');
// const SECRET = process.env.SECRET;

// exports.verifyToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];

//   if (!authHeader) return res.status(401).json({ message: 'No token provided' });

//   const token = authHeader.split(' ')[1];

//   if (!token) return res.status(403).json({ message: 'Invalid token format' });

//   jwt.verify(token, SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: 'Invalid or expired token' });

//     req.user = decoded; // Store user info from token
//     next();
//   });
// };

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Check if the token follows "Bearer <token>" format
  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(403).json({ message: 'Invalid token format. Expected: Bearer <token>' });
  }

  const token = tokenParts[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: 'Token expired' });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({ message: 'Invalid token' });
      } else {
        return res.status(403).json({ message: 'Token verification failed' });
      }
    }

    // Attach decoded user data to the request
    req.user = decoded;
    next();
  });
};
