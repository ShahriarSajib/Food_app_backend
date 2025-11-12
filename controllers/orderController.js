const Order = require("../models/orderModel");

// Create Order
const createOrderController = async (req, res) => {
  try {
    const { restaurantId, items, totalAmount, deliveryAddress, paymentMethod } = req.body;
    const userId = req.user.id; // from authMiddleware

    if (!restaurantId || !items || !totalAmount || !deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const order = new Order({
      userId,
      restaurantId,
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod,
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};

// Get All Orders (Admin only)
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("userId", "name email")
      .populate("restaurantId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalCount: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// Get Order by ID (User or Admin)
const getOrderByIdController = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email")
      .populate("restaurantId", "title");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Only the owner or admin can view
    if (req.user.userType !== "admin" && order.userId._id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Get Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message,
    });
  }
};

// Update Order Status (Admin only)
const updateOrderStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status || order.status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating order",
      error: error.message,
    });
  }
};

// Delete Order (Admin only)
const deleteOrderController = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Delete Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting order",
      error: error.message,
    });
  }
};

module.exports = {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
  deleteOrderController,
};
