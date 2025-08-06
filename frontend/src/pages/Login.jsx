import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/login",
        { username, password },
        { withCredentials: true } 
      )
      .then((res) => {
        // Response format: { success: true, message: "..."} OR { success: false, message: "..." }
        if (res.data.success) {
          alert("Logged in successfully");
          navigate("/"); // Navigate to dashboard
        } else {
          alert(res.data.message || "Invalid credentials");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Invalid credentials or server error");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        User Name:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
