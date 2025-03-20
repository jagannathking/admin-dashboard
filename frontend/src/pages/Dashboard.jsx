import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const VITE_API_URL = "https://book-management-seven-sepia.vercel.app/api";

  // State for user creation form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role
  });

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle user creation (Admin only)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${VITE_API_URL}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`, // Ensure token exists
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("User created successfully!");
        setFormData({ name: "", email: "", password: "", role: "user" });
      } else {
        alert(result.message || "Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!user) return null; // Prevent rendering if user is not logged in

  return (
    <div>
      <h2>Welcome, {user?.name || "User"}!</h2>

      {user?.role === "admin" ? (
        <div>
          <h3>Create a New User</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>
            <button type="submit">Create User</button>
          </form>
        </div>
      ) : (
        <p>You do not have permission to create users.</p>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
