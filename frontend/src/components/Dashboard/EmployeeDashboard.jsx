import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={styles.container}>
      <div style={styles.timeDisplay}>
        <p style={styles.date}>{formattedDate}</p>
        <p style={styles.time}>{formattedTime}</p>
      </div>

      <h2 style={styles.header}>Employee Dashboard</h2>

      <div style={styles.card}>
        <p>
          <strong>Name:</strong> {user?.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email || "N/A"}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  timeDisplay: {
    marginBottom: "20px",
    background: "#f0f8ff",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
    display: "inline-block",
  },
  date: {
    margin: "0 0 5px 0",
    color: "#555",
    fontSize: "14px",
  },
  time: {
    margin: 0,
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
  },
  header: {
    color: "#333",
    marginBottom: "20px",
  },
  card: {
    display: "inline-block",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    minWidth: "300px",
  },
};

export default EmployeeDashboard;
