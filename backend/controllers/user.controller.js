// user.controller.js
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("role");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Create User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Update User Route
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Update user and return updated document
    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // User ID from URL

    // Only Admin can delete users
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Access Denied. Only Admin can delete users.",
      });
    }

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete the user
    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



// user.controller.js
exports.getAllEmployeesForManager = async (req, res) => {
  try {
    // Verify is Manager
    if (req.user.role !== "Manager") {
      return res.status(403).json({ message: "Acess denied, only Manager" });
    }

    // Find all users with the role "Employee"
    const employees = await User.find({ role: "Employee" }).populate("role");  // Use .find instead of .findById
    res.json(employees);
  } catch (error) {
    console.error("Error getting employees:", error);
    res.status(500).json({ message: "Server error", error });
  }
};