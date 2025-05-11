// src/config/neo4j.js
const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'bolt://localhost:7687', // replace with your Neo4j host
  neo4j.auth.basic('neo4j', 'Test#123456789') // replace with your credentials
);

module.exports = driver;

