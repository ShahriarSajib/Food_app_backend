const express = require("express");
const {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
  deleteOrderController,
} = require("../controllers/orderController");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// Create Order (User)
router.post("/create", authMiddleware, createOrderController);

// Get All Orders (Admin)
router.get("/getAll", authMiddleware, adminMiddleware, getAllOrdersController);

// Get Order by ID (User or Admin)
router.get("/get/:id", authMiddleware, getOrderByIdController);

// Update Order Status (Admin)
router.put("/update/:id", authMiddleware, adminMiddleware, updateOrderStatusController);

// Delete Order (Admin)
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteOrderController);

module.exports = router;
