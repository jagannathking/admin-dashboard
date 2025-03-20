import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Get user state & logout function

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      
      {/* Show login & register if NOT logged in */}
      {!user ? (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      ) : (
        // Show dashboard & logout if logged in
        <>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
