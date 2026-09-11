const express = require("express");
const cors = require("cors");
const clientRoutes = require("./routes/client.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// API Routes
app.use("/api/admin", adminRoutes); // Mounts POST /api/admin/login
app.use("/api", clientRoutes);     // Mounts /api/clients, /api/get-client, etc.

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "UKVI Backend API is running" });
});

module.exports = app;