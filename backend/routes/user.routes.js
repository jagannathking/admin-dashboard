const express = require("express");
const { getAllUsers, getUserProfile, createUser,updateUser, deleteUser } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Admin can create Users or Managers
// Admin Routes
router.post("/create", authMiddleware(["Admin"]), createUser);
router.put("/update/:id", authMiddleware(["Admin"]), updateUser);
router.delete("/delete/:id", authMiddleware(["Admin"]), deleteUser);
router.get("/", authMiddleware(["Admin"]), getAllUsers);
router.get("/profile", authMiddleware(["Admin", "Manager", "Employee"]), getUserProfile);

module.exports = router;
