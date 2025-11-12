const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  updateFoodController,
  deleteFoodController,
} = require("../controllers/foodController");

const router = express.Router();

// Routes
router.post("/create", authMiddleware, createFoodController);
router.get("/getAll", getAllFoodController);
router.get("/get/:id", getFoodByIdController);
router.put("/update/:id", authMiddleware, updateFoodController);
router.delete("/delete/:id", authMiddleware, deleteFoodController);

module.exports = router;
