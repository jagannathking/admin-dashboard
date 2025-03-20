import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import "./ManagerDashboard.css";

const ManagerDashboard = () => {
  const { user } = useAuth();
  const API_URL = "https://admin-dashboard-five-delta-76.vercel.app/api";
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Search and filter functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Selected employee for more details
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = useCallback(
    async (showRefresh = false) => {
      if (!user || user.role !== "Manager") return;

      if (showRefresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      try {
        const response = await fetch(`${API_URL}/users/employees`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch employees: ${response.status}`);
        }

        const data = await response.json();
        setEmployees(data);

        if (showRefresh) {
          showNotification("Employee data refreshed successfully");
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError("Failed to load employee data.");

        if (showRefresh) {
          showNotification("Failed to refresh employee data", "error");
        }
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    },
    [user, API_URL]
  );

  // Filter employees based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);

  // Initial data fetch
  useEffect(() => {
    fetchEmployees();

    // Set up polling for real-time updates
    const interval = setInterval(() => {
      fetchEmployees(false);
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [fetchEmployees]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const handleRefresh = () => {
    fetchEmployees(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const viewEmployeeDetails = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeEmployeeDetails = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="manager-dashboard">
      <div className="dashboard-header">
        <h2>Manager Dashboard</h2>

        {notification.message && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
      </div>

      <div className="dashboard-actions">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="refresh-button"
        >
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="employee-section">
        <h3>Employee List</h3>

        {loading && !isRefreshing && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading employees...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => fetchEmployees()}>Try Again</button>
          </div>
        )}

        {!loading && !error && filteredEmployees.length === 0 && (
          <div className="no-results">
            {searchTerm
              ? "No employees match your search"
              : "No employees found"}
          </div>
        )}

        <div className="employee-list">
          {filteredEmployees.map((employee) => (
            <div key={employee._id} className="employee-card">
              <div className="employee-info">
                <h4>{employee.name}</h4>
                <p>{employee.email}</p>
              </div>

              <button
                onClick={() => viewEmployeeDetails(employee)}
                className="view-details-button"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Employee Details</h3>
              <button onClick={closeEmployeeDetails} className="close-button">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="employee-detail">
                <strong>Name:</strong> {selectedEmployee.name}
              </div>
              <div className="employee-detail">
                <strong>Email:</strong> {selectedEmployee.email}
              </div>
              <div className="employee-detail">
                <strong>Role:</strong> {selectedEmployee.role || "Employee"}
              </div>
              <div className="employee-detail">
                <strong>ID:</strong> {selectedEmployee._id}
              </div>
              {selectedEmployee.department && (
                <div className="employee-detail">
                  <strong>Department:</strong> {selectedEmployee.department}
                </div>
              )}
              {selectedEmployee.joinDate && (
                <div className="employee-detail">
                  <strong>Join Date:</strong>{" "}
                  {new Date(selectedEmployee.joinDate).toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                onClick={closeEmployeeDetails}
                className="button secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;
