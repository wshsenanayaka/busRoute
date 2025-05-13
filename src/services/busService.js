const driver = require('../config/neo4j');

// SINGAL PATH 
// exports.getBusIdsBetweenLocations = async (startLoc, endLoc) => {
//   const session = driver.session();

//   const query = `
//     MATCH (start:Location {name: $startLoc}), (end:Location {name: $endLoc})
//     MATCH path = shortestPath((start)-[:ROAD*]->(end))
//     WITH relationships(path) AS rels
//     UNWIND [r IN rels | r.bus_ids] AS bus_id
//     RETURN COLLECT(DISTINCT bus_id) AS all_unique_bus_ids_in_path
//   `;

//   try {
//     const result = await session.run(query, { startLoc, endLoc });
//     const busIds = result.records[0].get('all_unique_bus_ids_in_path');
//     return busIds;
//   } finally {
//     await session.close();
//   }
// };

// MULTIPLE PATHS 
exports.getBusIdsBetweenLocations = async (startLoc, endLoc) => {
  const session = driver.session();

  const query = `
    MATCH (start:Location {name: $startLoc}), (end:Location {name: $endLoc})
    MATCH path = (start)-[:ROAD*1..5]->(end)
    WITH relationships(path) AS rels
    UNWIND rels AS r
    UNWIND r.bus_ids AS bus_id
    RETURN COLLECT(DISTINCT bus_id) AS all_unique_bus_ids_in_path
  `;

  try {
    const result = await session.run(query, { startLoc, endLoc });
    const busIds = result.records.length ? result.records[0].get('all_unique_bus_ids_in_path') : [];
    return busIds;
  } finally {
    await session.close();
  }
};

