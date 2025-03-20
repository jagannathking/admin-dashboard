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

    // Only Admin can create a new user
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Access Denied. Only Admin can create users.",
      });
    }

    // Check if the role exists
    const roleData = await Role.findOne({ name: role });
    if (!roleData) {
      return res
        .status(400)
        .json({ message: "Invalid role. Role must be either 'User' or 'Manager'." });
    }

    // Only allow 'User' or 'Manager' roles
    if (!["User", "Manager"].includes(role)) {
      return res.status(403).json({
        message: "Admins can only create 'User' or 'Manager' accounts.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      role: roleData._id,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully by Admin." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params; // User ID from URL
    const { name, email, role } = req.body; // Updated details

    // Only Admin can update users
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Access Denied. Only Admin can update users.",
      });
    }

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the new role is valid
    if (role) {
      const validRoles = ["User", "Manager"];
      if (!validRoles.includes(role)) {
        return res
          .status(400)
          .json({ message: "Invalid role. Only 'User' or 'Manager' roles are allowed." });
      }
    }

    // Update user data
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    res.status(200).json({ message: "User updated successfully." });
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