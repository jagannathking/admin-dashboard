const jwt = require("jsonwebtoken");

module.exports = (options) => (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user to the request

    const { roles, permissions } = options;

    // Check roles
    if (roles && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: "Access denied (role)" });
    }

    // You cannot find any of these, as no database look-up of objectID is necessary
    next(); // Proceed to the next middleware or route handler

  } catch (error) {
    console.error("Auth middleware error:", error); // Log the error for debugging
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please login again." });
    }
    res.status(401).json({ message: "Invalid token" });
  }
};