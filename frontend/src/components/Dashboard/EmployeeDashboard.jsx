import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const EmployeeDashboard = () => {
    const { user } = useAuth();
    const VITE_API_URL = "https://book-management-seven-sepia.vercel.app/api";
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true); // Start loading

            try {
                const response = await fetch(`${VITE_API_URL}/users/profile`, { // Get from profile
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch profile: ${response.status}`
                    );
                }

                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
                alert("Failed to load profile data.");
            } finally {
                setLoading(false); // Stop loading, regardless of success
            }
        };

        fetchProfile();
    }, [user, VITE_API_URL]);

    return (
        <div>
            <h2>Employee Dashboard</h2>
            {loading ? (
                <p>Loading profile...</p>
            ) : profile ? (
                <>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <p>Role: {profile.role}</p>
                </>
            ) : (
                <p>No profile data available.</p>
            )}
        </div>
    );
};

export default EmployeeDashboard;