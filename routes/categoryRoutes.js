const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createCatController } = require("../controllers/categoryControllers");

const router = express.Router();

// Routes
router.post("/create", authMiddleware, createCatController);

module.exports = router;
