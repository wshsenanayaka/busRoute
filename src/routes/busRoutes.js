const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");

router.post('/bus-ids', busController.getBusIds);

module.exports = router;