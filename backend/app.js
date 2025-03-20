const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


// test route
app.get("/", (req, res) => {
    res.status(200).json({message: "Healthy"})
})


module.exports = app;

