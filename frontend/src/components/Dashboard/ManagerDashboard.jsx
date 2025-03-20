import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const ManagerDashboard = () => {
  const { user } = useAuth();
  const API_URL = "https://admin-dashboard-five-delta-76.vercel.app/api"; // Ensure this is correct
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Handle errors

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!user || user.role !== "Manager") return; // Ensure only managers fetch employees
      setLoading(true);
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
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError("Failed to load employee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [user, API_URL]);

  return (
    <div>
      <h2>Manager Dashboard</h2>
      <h3>Employee List</h3>

      {loading && <p>Loading employees...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {!loading && !error && employees.length === 0 && <p>No employees found.</p>}

      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name} ({employee.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagerDashboard;
