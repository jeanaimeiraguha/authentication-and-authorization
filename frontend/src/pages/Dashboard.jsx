import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    let timer;

    const logout = () => {
      axios
        .post("http://localhost:3000/logout", {}, { withCredentials: true })
        .then(() => {
          alert("Logged out due to inactivity");
          navigate("/login");
        })
        .catch(() => {
          navigate("/login");
        });
    };

    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(logout, 5 * 60 * 1000); // 5 minutes
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // start timer on mount

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
      if (timer) clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome to Dashboard</h2>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <span style={styles.separator}>|</span>
        <Link to="/logout" style={styles.link}>
          Logout
        </Link>
      </nav>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  nav: {
    fontSize: "18px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    padding: "0 10px",
  },
  separator: {
    padding: "0 5px",
    color: "#555",
  },
};

export default Dashboard;
