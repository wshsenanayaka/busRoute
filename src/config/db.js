// src/config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,      // e.g., 'localhost'
  user: process.env.DB_USER,      // e.g., 'root'
  password: process.env.DB_PASS,  // e.g., 'password'
  database: process.env.DB_NAME   // e.g., 'my_database'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
});

module.exports = connection;