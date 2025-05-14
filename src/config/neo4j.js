//// src/config/neo4j.js
const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  process.env.NEO4J_URI, // replace with your Neo4j host
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD) // replace with your credentials
);

module.exports = driver;

