const express = require("express");
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController
} = require("../controllers/userControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//routes
router.get("/getUser", authMiddleware, getUserController);
router.put("/updateUser", authMiddleware, updateUserController);
router.post("/resetPassword", authMiddleware, resetPasswordController);
router.put("/updatePassword",authMiddleware, updatePasswordController);
router.delete("/deleteUser/:id", authMiddleware, deleteUserController);

module.exports = router;
