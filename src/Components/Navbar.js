import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Dashboard = () => {
  const logout = () => {
    localStorage.clear();
    window.reload();
  };
  return (
    <header class="header">
      <div class="mid">
        <ul class="navbar">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link>
              Welcome {JSON.parse(localStorage.getItem("user")).givenName}
            </Link>
          </li>
          <li className="logout">
            <Link onClick={logout}>Logout</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Dashboard;
