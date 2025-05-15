const pool = require('../config/db');
const {
  getDirectBusInfo,
  getConnectingBusInfo
} = require('../services/busService');

exports.getBusIds = async (req, res) => {
  const { start, end } = req.body;

  if (!start || !end) {
    return res.status(400).json({ message: 'Start and End locations are required' });
  }

  try {
    const [directData, connectingData] = await Promise.all([
      getDirectBusInfo(start, end),
      getConnectingBusInfo(start, end)
    ]);

    // Combine unique bus_ids from both
    const allBusIds = [
      ...new Set([
        ...directData.map(d => d.bus_id),
        ...connectingData.map(c => c.bus_id)
      ])
    ];

    if (allBusIds.length === 0) {
      return res.status(404).json({ message: 'No bus routes found.' });
    }

    const placeholders = allBusIds.map(() => '?').join(',');
    const sql = `SELECT * FROM bus_routetb WHERE neo4j_id IN (${placeholders})`;

    pool.query(sql, allBusIds, (err, results) => {
      if (err) {
        console.error('MySQL Error:', err);
        return res.status(500).json({ error: 'MySQL query failed' });
      }

      const busRouteMap = {};
      results.forEach(r => {
        busRouteMap[r.neo4j_id] = r;
      });

      const enrich = (dataArr) =>
        dataArr.map(d => ({
          ...busRouteMap[d.bus_id],
          totalDistance: d.totalDistance,
          totalTime: d.totalTime
        }));

      return res.status(200).json({
        busRoutes: {
          direct: enrich(directData),
          connecting: enrich(connectingData)
        }
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
