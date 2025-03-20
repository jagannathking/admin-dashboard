import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import ManagerDashboard from "../components/Dashboard/mananger";
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
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, <span className="text-blue-600">{user?.name || "User"}</span>
          !
        </h2>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm9 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-2 8a1 1 0 100 2h4a1 1 0 100-2h-4z"
              clipRule="evenodd"
            />
          </svg>
          Logout
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        {roleComponents[user?.role] || (
          <div className="flex flex-col items-center justify-center py-6 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-center">No dashboard available for this role.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
