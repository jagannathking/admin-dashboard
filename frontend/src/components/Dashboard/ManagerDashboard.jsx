import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const ManagerDashboard = () => {
    const { user } = useAuth();
    const VITE_API_URL = "https://book-management-seven-sepia.vercel.app/api";
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${VITE_API_URL}/users/profile`, {
                    // Get from profile because manager can only see emplyes
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch employees: ${response.status}`
                    );
                }

                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employees:", error);
                alert("Failed to load employee data.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [user, VITE_API_URL]);

    return (
        <div>
            <h2>Manager Dashboard</h2>
            <h3>Employee List</h3>
            {loading ? (
                <p>Loading employees...</p>
            ) : (
                <ul>
                    {employees.map((employee) => (
                        <li key={employee._id}>
                            {employee.name} ({employee.email})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ManagerDashboard;