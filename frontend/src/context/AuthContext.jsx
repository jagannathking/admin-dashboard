import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

export const AuthContext = createContext();

const BASE_URL = "https://admin-dashboard-five-delta-76.vercel.app/api/auth";
// const BASE_URL = "http://localhost:3000/api/auth"; // For local development

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${BASE_URL}/login`, { email, password });
            const { token, user: userData } = res.data; // Get user data from response

            const fullUser = { ...userData, token: token };

            // setUser the whole object, from the database: name, email, and roles.
            setUser(fullUser); // Make sure that "role" is now accessible

            localStorage.setItem("token", token); // Keep the token around for API operations.
            localStorage.setItem("user", JSON.stringify(fullUser)); // Ensure Role persists!

            return true; // Indicate successful login
        } catch (error) {
            console.error("Login error:", error);
            throw new Error(
                error.response?.data?.message || "Login failed. Please try again."
            );
        }
    };

    const register = async (formData) => {
        try {
            const res = await axios.post(`${BASE_URL}/register`, formData);
            const { message } = res.data; // Make sure this is message with success message
            // On success we dont need to create token, it gives a server error.

            return message; // Indicate successful registration
        } catch (error) {
            console.error("Register error:", error);
            throw new Error(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};