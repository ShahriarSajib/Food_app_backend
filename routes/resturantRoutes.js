const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createResturantController, getAllResturantController, getResturantByIDController, deleteRestaurantController } = require("../controllers/resturantController");

const router = express.Router();

//routes
router.post("/create", authMiddleware, createResturantController);
router.get("/getAll", getAllResturantController);
router.get("/get/:id", getResturantByIDController);
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);
module.exports = router;
