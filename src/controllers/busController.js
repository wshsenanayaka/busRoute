const { getBusIdsBetweenLocations } = require('../services/busService');
const pool = require('../config/db.js');

exports.getBusIds = async (req, res) => {
  const { start, end } = req.body;

  if (!start || !end) {
    return res.status(400).json({ message: 'Start and End locations are required' });
  }

  try {
    const busIds = await getBusIdsBetweenLocations(start, end);

    // Extract all 'low' values
    const lowValues = busIds.map(id => (typeof id === 'object' && id.low !== undefined) ? id.low : id);

    // Fetch data from MySQL for each Neo4j bus ID
    const placeholders = lowValues.map(() => '?').join(',');
    const query = `SELECT * FROM bus_routetb WHERE neo4j_id IN (${placeholders})`;

    pool.query(query, lowValues, (err, results) => {
      if (err) {
        console.error('MySQL Error:', err);
        return res.status(500).json({ error: 'MySQL query failed' });
      }

      res.status(200).json({ busRoutes: results });
    });

  } catch (error) {
    console.error('Neo4j or Logic Error:', error);
    res.status(500).json({ error: 'Failed to fetch bus IDs' });
  }
};