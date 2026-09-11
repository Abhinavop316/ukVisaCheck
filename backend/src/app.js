const express = require("express");
const cors = require("cors");
const clientRoutes = require("./routes/client.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// Comprehensive CORS setup allowing cross-origin requests from Vercel/Hostinger deployments
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

// Request Body Parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Root Route & Health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "UKVI Verification Backend API",
    message: "API server is live and running.",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "UKVI Backend API is running" });
});

// API Routes (supports both /api/admin/login and /admin/login, /api/clients and /clients)
app.use("/api/admin", adminRoutes); // Mounts POST /api/admin/login
app.use("/admin", adminRoutes);     // Mounts POST /admin/login
app.use("/api", clientRoutes);     // Mounts /api/clients, /api/get-client, /api/send-security-code, etc.
app.use("/", clientRoutes);        // Mounts /clients, /get-client, etc.

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

module.exports = app;