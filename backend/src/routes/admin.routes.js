const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controllers/admin.controller");

// Admin authentication endpoint
router.post("/login", adminLogin);
router.post("/admin-login", adminLogin);

module.exports = router;
