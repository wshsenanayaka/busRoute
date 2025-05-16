const { getAllLocations ,getAllBusRoutes} = require('../services/locationService');
const pool = require('../config/db.js');
const driver = require('../config/neo4j.js');

exports.fetchLocations = async (req, res) => {
  try {
    const locations = await getAllLocations();
    res.status(200).json({ locations });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
};

///////////////////////
exports.fetchBusRoutes = async (req, res) => {
  try {
    const busRoutes = await getAllBusRoutes();
    res.status(200).json({ busRoutes });
  } catch (error) {
    console.error('Error fetching bus routes:', error);
    res.status(500).json({ error: 'Failed to fetch bus routes' });
  }
};

/////////////////////////
exports.createLocation = async (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Location name is required' });
    }
  
    // Step 1: Check if location already exists
    pool.query('SELECT id FROM locationtb WHERE name = ?', [name], (checkErr, checkResults) => {
      if (checkErr) {
        return res.status(500).json({ message: 'Failed to check existing location', error: checkErr });
      }
  
      if (checkResults.length > 0) {
        return res.status(200).json({ message: 'Location already exists', mysql_id: checkResults[0].id });
      }
  
      // Step 2: Insert into MySQL
      pool.query('INSERT INTO locationtb (name, status) VALUES (?, 1)', [name], async (insertErr, result) => {
        if (insertErr) {
          return res.status(500).json({ message: 'Failed to insert into MySQL', error: insertErr });
        }
  
        const insertedId = result.insertId;
  
        try {
          // Step 3: Insert into Neo4j
          const session = driver.session();
          await session.run(
            `CREATE (:Location {name: $name, id: $id})`,
            { name, id: insertedId }
          );
          await session.close();
  
          //res.status(200).json({ message: 'Location added to MySQL and Neo4j', mysql_id: insertedId });
          res.status(200).json({ message: 'Location successfully added'});
        } catch (neoErr) {
          res.status(500).json({ message: 'Inserted to MySQL but failed in Neo4j', error: neoErr });
        }
      });
    });
  };

  exports.deleteLocation = async (req, res) => {
    const { id } = req.body;
  
    if (!id) {
      return res.status(400).json({ message: 'Location ID is required' });
    }
  
    try {
      // 1. Get location name from MySQL
      const [location] = await queryMySQL('SELECT name FROM locationtb WHERE id = ?', [id]);
      if (!location) {
        return res.status(404).json({ message: 'Location not found in MySQL' });
      }
  
      const locationName = location.name;
  
      // 2. Delete from Neo4j
      const session = driver.session();
      await session.run(
        `MATCH (l:Location {name: $name, id: $id}) DETACH DELETE l`,
        { name: locationName, id: parseFloat(id) }
      );
      await session.close();
  
      // 3. Delete from MySQL
      await queryMySQL('DELETE FROM locationtb WHERE id = ?', [id]);
  
      //return res.status(200).json({ message: `Location '${locationName}' deleted from MySQL and Neo4j.` });
      return res.status(200).json({ message: `Location '${locationName}' successfully deleted.` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete location', error: err.message });
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



