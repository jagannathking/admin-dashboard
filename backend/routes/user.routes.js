const express = require("express");
const { getAllUsers, getUserProfile, createUser, updateUser, deleteUser } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware({ roles: ["Admin"] }), getAllUsers);
router.get("/profile", authMiddleware({ roles: ["Admin", "Manager", "Employee"] }), getUserProfile);

router.post("/create", authMiddleware({ roles: ["Admin"] }), createUser);
router.put("/update/:id", authMiddleware({ roles: ["Admin"] }), updateUser);
router.delete("/delete/:id", authMiddleware({ roles: ["Admin"] }), deleteUser);

module.exports = router;