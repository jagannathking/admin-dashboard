import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user } = useAuth();
  const VITE_API_URL = "https://admin-dashboard-five-delta-76.vercel.app/api";
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    if (user?.role === "Admin") {
      console.log("User Token:", user?.token); // Debugging line
      fetchUsers();
    }
  }, [user, VITE_API_URL]);

  // Create user form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  // Edit user form state
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    email: "",
    role: "", // Changed back to string to match the User model
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${VITE_API_URL}/users/`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Call fetchUsers only if user has "Admin" role
    if (user?.role === "Admin") {
      fetchUsers();
    }
  }, [user, VITE_API_URL]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${VITE_API_URL}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        fetchUsers(); // after create refrsh

        showNotification("User created successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "User",
        });
      } else {
        showNotification(result.message || "Failed to create user.", "error");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      showNotification("Something went wrong. Please try again.", "error");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`${VITE_API_URL}/users/delete/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        if (response.ok) {
          showNotification("User deleted successfully!");
          fetchUsers();
        } else {
          const result = await response.json();
          showNotification(result.message || "Failed to delete user.", "error");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        showNotification("Something went wrong. Please try again.", "error");
      }
    }
  };

  const handleEditUser = (userItem) => {
    setSelectedUser(userItem);
    setUpdateFormData({
      name: userItem.name,
      email: userItem.email,
      role: userItem.role,
    });
  };

  const handleUpdateFormDataChange = (e) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${VITE_API_URL}/users/update/${selectedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(updateFormData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        showNotification("User updated successfully!");
        setSelectedUser(null);
        setUpdateFormData({
          name: "",
          email: "",
          role: "", // set to string for update
        });
        fetchUsers(); // refresh
      } else {
        showNotification(result.message || "Failed to update user.", "error");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      showNotification("Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Notification Component */}
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="dashboard-container">
        <div className="form-container">
          <h3>Create New User</h3>
          <form onSubmit={handleCreateUser} className="user-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="User">User</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Create User
            </button>
          </form>
        </div>

        <div className="user-list-container">
          <h3>User List</h3>

          {isLoading && <div className="loading">Loading users...</div>}

          {error && <div className="error-message">{error}</div>}

          {!isLoading && !error && users.length === 0 && (
            <div className="no-users">No users found.</div>
          )}

          <ul className="user-list">
            {users.map((userItem) => (
              <li key={userItem._id} className="user-item">
                <div className="user-info">
                  <span className="user-name">{userItem.name}</span>
                  <span className="user-email">({userItem.email})</span>
                  <span className="user-role">Role: {userItem.role}</span>
                </div>
                <div className="user-actions">
                  <button
                    onClick={() => handleEditUser(userItem)}
                    className="btn btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(userItem._id)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit User</h3>
            <form onSubmit={handleUpdateUser} className="user-form">
              <div className="form-group">
                <label htmlFor="update-name">Name</label>
                <input
                  id="update-name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={updateFormData.name}
                  onChange={handleUpdateFormDataChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="update-email">Email</label>
                <input
                  id="update-email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={updateFormData.email}
                  onChange={handleUpdateFormDataChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="update-role">Role</label>
                <select
                  id="update-role"
                  name="role"
                  value={updateFormData.role}
                  onChange={handleUpdateFormDataChange}
                >
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Update User
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedUser(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
