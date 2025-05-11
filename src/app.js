const express = require("express");
const app = express();

const routeRoutes = require("./routes/busRoutes");
const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');

app.use(express.json());
app.use("/api", routeRoutes);
app.use('/api', authRoutes);
app.use('/api/location', locationRoutes);

module.exports = app;