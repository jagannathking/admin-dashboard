import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import ManagerDashboard from "../components/Dashboard/ManagerDashboard";
import EmployeeDashboard from "../components/Dashboard/EmployeeDashboard";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Role component mapping
  const roleComponents = {
    Admin: <AdminDashboard />,
    Manager: <ManagerDashboard />,
    Employee: <EmployeeDashboard />,
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div>
      <h2>Welcome, {user?.name || "User"}!</h2>
      {roleComponents[user?.role] || <p>No dashboard for this role.</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
