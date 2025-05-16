
const pool = require('../config/db.js');
const driver = require('../config/neo4j.js');

const joinLocations = async (req, res) => {
    const { start_id, end_id, bus_ids, distance, time } = req.body;
  
    if (!start_id || !end_id || !bus_ids || !distance || !time) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
  
    try {
      // Get start and end location names from MySQL
      const [startLocation] = await queryMySQL('SELECT name FROM locationtb WHERE id = ?', [start_id]);
      const [endLocation] = await queryMySQL('SELECT name FROM locationtb WHERE id = ?', [end_id]);
  
      if (!startLocation || !endLocation) {
        return res.status(404).json({ message: "One or both location IDs not found" });
      }
  
      const session = driver.session();
      const cypher = `
        MATCH (start:Location {name: $startName, id: $startId}), 
              (end:Location {name: $endName, id: $endId})
        CREATE (start)-[:ROAD {distance: $distance, time: $time, bus_ids: $bus_ids}]->(end)
      `;
  
      await session.run(cypher, {
        startName: startLocation.name,
        startId: parseInt(start_id),
        endName: endLocation.name,
        endId: parseInt(end_id),
        distance: parseFloat(distance),
        time: parseInt(time),
        bus_ids:Array.isArray(bus_ids) ? bus_ids : [parseInt(bus_ids)]
      });
  
      await session.close();
      //return res.status(200).json({ message: "ROAD relationship created successfully in Neo4j" });
      return res.status(200).json({ message: "ROAD relationship created successfully" });
  
    } catch (error) {
      console.error("Neo4j Error:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  };
  
  function queryMySQL(sql, params) {
    return new Promise((resolve, reject) => {
      pool.query(sql, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  ///////////////////////
  const getAllRoadConnections = async (req, res) => {
    const session = driver.session();
  
    try {
      const result = await session.run(`
        MATCH (a:Location)-[r:ROAD]->(b:Location)
        RETURN a.id AS from_id, a.name AS from_name,
               b.id AS to_id, b.name AS to_name,
               r.distance AS distance,
               r.time AS time,
               r.bus_ids AS bus_ids
      `);
  
      const connections = result.records.map(record => ({
        from: {
          id: record.get('from_id').low || record.get('from_id'),
          name: record.get('from_name')
        },
        to: {
          id: record.get('to_id').low || record.get('to_id'),
          name: record.get('to_name')
        },
        distance: record.get('distance'),
        time: record.get('time'),
        bus_ids: record.get('bus_ids')
      }));
  
      res.status(200).json({ connections });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch road connections', error });
    } finally {
      await session.close();
    }
  };
  
  module.exports = { joinLocations, getAllRoadConnections };
  
  