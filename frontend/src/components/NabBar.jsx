import { NavLink } from "react-router-dom";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Get user state & logout function

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold text-white mr-6">
            <img src="../assets" alt="logo" />
          </span>
          <div className="flex space-x-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive 
                    ? "bg-gray-900 text-white" 
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              Home
            </NavLink>
            
            {/* Show login & register if NOT logged in */}
            {!user ? (
              <>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? "bg-gray-900 text-white" 
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? "bg-gray-900 text-white" 
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            ) : (
              // Show dashboard & logout if logged in
              <>
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive 
                        ? "bg-gray-900 text-white" 
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <button 
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
        
        {user && (
          <div className="text-gray-300 flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="text-sm">{user.name || user.email}</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;