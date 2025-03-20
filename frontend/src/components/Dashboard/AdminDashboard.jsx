import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth(); // No logout here
  const VITE_API_URL = "https://book-management-seven-sepia.vercel.app/api";
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User", // Default role for new users created by Admin
  });
  const [selectedUser, setSelectedUser] = useState(null); // For update
  const [updateFormData, setUpdateFormData] = useState({
    // for update user, it does not affect to form data
    name: "",
    email: "",
    role: "User",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to load users.");
      }
    };

    fetchUsers();
  }, [user, VITE_API_URL]);

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
        alert("User created successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "User",
        });
        // Refresh user list after creating a new user
        fetchUsers();
      } else {
        alert(result.message || "Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong. Please try again.");
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
          alert("User deleted successfully!");
          // Refresh user list after deleting a user
          fetchUsers();
        } else {
          const result = await response.json();
          alert(result.message || "Failed to delete user.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Something went wrong. Please try again.");
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
        alert("User updated successfully!");
        setSelectedUser(null);
        setUpdateFormData({
          name: "",
          email: "",
          role: "User",
        });
        // Refresh data
        fetchUsers();
      } else {
        alert(result.message || "Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Create New User</h3>
      <form onSubmit={handleCreateUser}>
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
          <option value="User">User</option>
          <option value="Manager">Manager</option>
        </select>
        <button type="submit">Create User</button>
      </form>

      <h3>User List</h3>
      <ul>
        {users.map((userItem) => (
          <li key={userItem._id}>
            {userItem.name} ({userItem.email}) - Role: {userItem.role}
            <button onClick={() => handleEditUser(userItem)}>Edit</button>
            <button onClick={() => handleDeleteUser(userItem._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          <h3>Edit User</h3>
          <form onSubmit={handleUpdateUser}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={updateFormData.name}
              onChange={handleUpdateFormDataChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={updateFormData.email}
              onChange={handleUpdateFormDataChange}
              required
            />
            <select
              name="role"
              value={updateFormData.role}
              onChange={handleUpdateFormDataChange}
            >
              <option value="User">User</option>
              <option value="Manager">Manager</option>
            </select>
            <button type="submit">Update User</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
