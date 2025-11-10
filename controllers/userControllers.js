const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// Get user info
const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User info fetched",
      user,
    });
  } catch (error) {
    console.log("Get User Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in getting user info",
      error,
    });
  }
};

// Update user info
const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    const { name, phone, address } = req.body;
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    await user.save();

    res.status(200).send({
      success: true,
      message: "User info updated",
      user,
    });
  } catch (error) {
    console.log("Update User Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in updating user info",
      error,
    });
  }
};

// Update password (requires login)
const updatePasswordController = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({ success: false, message: "Incorrect old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log("Update Password Error:", error);
    res.status(500).send({
      success: false,
      message: "Error updating password",
      error,
    });
  }
};

// Reset password (no login required)
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("Reset Password Error:", error);
    res.status(500).send({
      success: false,
      message: "Error resetting password",
      error,
    });
  }
};

//DELETE USER/PROFILE
const deleteUserController = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }
        res.status(200).send({
          success: true,
          message: "Your account has been deleted successfully",
        });
    } catch (error) {
        console.log("Delete User Error:", error);
        res.status(500).send({
          success: false,
          message: "Error deleting user",
          error
        });
    }
};
module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController
};