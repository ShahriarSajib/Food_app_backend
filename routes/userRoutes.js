const express = require('express');
const { getUserController, updateUserController } = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//routes
router.get('/getUser', authMiddleware, getUserController);
router.put('/updateUser', authMiddleware, updateUserController);
module.exports = router;