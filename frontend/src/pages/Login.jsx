import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  // toggle state: true = login, false = register
  const [isLogin, setIsLogin] = useState(true);

  // Login states
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register states (no email)
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/login",
        { username: loginUsername, password: loginPassword },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          alert("Logged in successfully");
          navigate("/"); // dashboard
        } else {
          alert(res.data.message || "Invalid credentials");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Invalid credentials or server error");
      });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (regPassword !== regConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post(
        "http://localhost:3000/register",
        { username: regUsername, password: regPassword },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          alert("Registered successfully, please login");
          setIsLogin(true);
          // Clear register form
          setRegUsername("");
          setRegPassword("");
          setRegConfirmPassword("");
        } else {
          alert(res.data.message || "Registration failed");
        }
      })
      .catch((err) => {
        console.error("Registration error:", err);
        alert("Server error or invalid data");
      });
  };

  return (
    <div style={styles.container}>
      {isLogin ? (
        <form onSubmit={handleLoginSubmit} style={styles.form}>
          <h2 style={styles.title}>Login</h2>

          <label style={styles.label} htmlFor="loginUsername">
            User Name:
          </label>
          <input
            id="loginUsername"
            type="text"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            style={styles.input}
            placeholder="Enter username"
            required
          />

          <label style={styles.label} htmlFor="loginPassword">
            Password:
          </label>
          <input
            id="loginPassword"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter password"
            required
          />

          <button type="submit" style={styles.button}>
            Login
          </button>

          <p style={styles.toggleText}>
            Don't have an account?{""}
            <span style={styles.toggleLink} onClick={() => setIsLogin(false)}>
              Register here
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} style={styles.form}>
          <h2 style={styles.title}>Register</h2>

          <label style={styles.label} htmlFor="regUsername">
            User Name:
          </label>
          <input
            id="regUsername"
            type="text"
            value={regUsername}
            onChange={(e) => setRegUsername(e.target.value)}
            style={styles.input}
            placeholder="Enter username"
            required
          />

          <label style={styles.label} htmlFor="regPassword">
            Password:
          </label>
          <input
            id="regPassword"
            type="password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter password"
            required
          />

          <label style={styles.label} htmlFor="regConfirmPassword">
            Confirm Password:
          </label>
          <input
            id="regConfirmPassword"
            type="password"
            value={regConfirmPassword}
            onChange={(e) => setRegConfirmPassword(e.target.value)}
            style={styles.input}
            placeholder="Confirm password"
            required
          />

          <button type="submit" style={{ ...styles.button, backgroundColor: "#28a745" }}>
            Register
          </button>

          <p style={styles.toggleText}>
            Already have an account?{" "}
            <span style={styles.toggleLink} onClick={() => setIsLogin(true)}>
              Login here
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "320px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
  toggleText: {
    marginTop: "15px",
    textAlign: "center",
    color: "#555",
  },
  toggleLink: {
    color: "#007bff",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline",
  },
};

export default Auth;
