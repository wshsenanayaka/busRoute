const express = require('express');
const router = express.Router();
const locationController   = require('../controllers/locationController');
const roadController   = require('../controllers/roadController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/locations', locationController.fetchLocations);
router.post('/add-location', verifyToken,locationController.createLocation);
router.post('/join', verifyToken,roadController.joinLocations);
router.get('/all-location', verifyToken,roadController.getAllRoadConnections);
router.delete('/delete', verifyToken,locationController.deleteLocation);
router.get('/all-busRoutes', verifyToken,locationController.fetchBusRoutes);

module.exports = router;
