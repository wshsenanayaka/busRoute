const driver = require('../config/neo4j');

// Get bus info for a single path (shortestPath)
exports.getDirectBusInfo = async (startLoc, endLoc) => {
  const session = driver.session();
  const query = `
    MATCH (start:Location {name: $startLoc}), (end:Location {name: $endLoc})
    MATCH path = shortestPath((start)-[:ROAD*]->(end))
    WITH relationships(path) AS rels
    UNWIND rels AS r
    UNWIND r.bus_ids AS bus_id
    RETURN bus_id, sum(r.distance) AS totalDistance, sum(r.time) AS totalTime
  `;

  try {
    const result = await session.run(query, { startLoc, endLoc });
    return result.records.map(r => ({
      bus_id: r.get('bus_id')?.low || r.get('bus_id'),
      totalDistance: r.get('totalDistance'),
      totalTime: r.get('totalTime')
    }));
  } finally {
    await session.close();
  }
};

// Get bus info for all connected paths (up to 5 hops)
exports.getConnectingBusInfo = async (startLoc, endLoc) => {
  const session = driver.session();
  const query = `
    MATCH (start:Location {name: $startLoc}), (end:Location {name: $endLoc})
    MATCH path = (start)-[:ROAD*1..5]->(end)
    WITH relationships(path) AS rels
    UNWIND rels AS r
    UNWIND r.bus_ids AS bus_id
    RETURN bus_id, sum(r.distance) AS totalDistance, sum(r.time) AS totalTime
  `;

  try {
    const result = await session.run(query, { startLoc, endLoc });
    return result.records.map(r => ({
      bus_id: r.get('bus_id')?.low || r.get('bus_id'),
      totalDistance: r.get('totalDistance'),
      totalTime: r.get('totalTime')
    }));
  } finally {
    await session.close();
  }
};
