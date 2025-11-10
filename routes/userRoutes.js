const express = require('express');
const { getUserController } = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//routes
router.get('/getUser', authMiddleware, getUserController);

module.exports = router;