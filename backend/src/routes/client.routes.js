const express = require("express");
const router = express.Router();
const {
  createClient,
  updateClient,
  getClientByPassport,
  getClientByQuery,
  getAllClients,
  getClientById,
  sendSecurityCode,
  verifySecurityCode,
} = require("../controllers/client.controller");

// --- Client Applications Endpoints ---

// Create a new client application
router.post("/clients", createClient);

// Retrieve all client applications
router.get("/clients", getAllClients);

// Find client by Passport Number
router.get("/clients/passport/:passportNumber", getClientByPassport);
router.post("/clients/passport", getClientByPassport);

// Search client by passport/email/identNum (used by user status portal)
router.post("/get-client", getClientByQuery);

// Resend Email Security Verification Code Endpoints
router.post("/send-security-code", sendSecurityCode);
router.post("/verify-security-code", verifySecurityCode);

// Single client operations by Mongo _id
router.get("/clients/:id", getClientById);
router.put("/clients/:id", updateClient);

module.exports = router;
