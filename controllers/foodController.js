const Food = require("../models/foodModel");

// CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, restaurantId } = req.body;

    if (!name || !price || !category || !imageUrl || !restaurantId) {
      return res.status(400).send({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const newFood = new Food({
      name,
      description,
      price,
      category,
      imageUrl,
      restaurantId,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "Food created successfully",
      food: newFood,
    });
  } catch (error) {
    console.error("Create Food Error:", error);
    res.status(500).send({
      success: false,
      message: "Error creating food",
      error: error.message,
    });
  }
};

// GET ALL FOODS
const getAllFoodController = async (req, res) => {
  try {
    const foods = await Food.find().populate("restaurantId", "title phone");
    res.status(200).send({
      success: true,
      total: foods.length,
      foods,
    });
  } catch (error) {
    console.error("Get All Foods Error:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching foods",
      error: error.message,
    });
  }
};

// GET FOOD BY ID
const getFoodByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id).populate("restaurantId", "title phone");

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.error("Get Food by ID Error:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching food",
      error: error.message,
    });
  }
};

// UPDATE FOOD
const updateFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedFood = await Food.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedFood) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Food updated successfully",
      food: updatedFood,
    });
  } catch (error) {
    console.error("Update Food Error:", error);
    res.status(500).send({
      success: false,
      message: "Error updating food",
      error: error.message,
    });
  }
};

// DELETE FOOD
const deleteFoodController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFood = await Food.findByIdAndDelete(id);
    if (!deletedFood) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Food deleted successfully",
      deletedFood,
    });
  } catch (error) {
    console.error("Delete Food Error:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting food",
      error: error.message,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  updateFoodController,
  deleteFoodController,
};
