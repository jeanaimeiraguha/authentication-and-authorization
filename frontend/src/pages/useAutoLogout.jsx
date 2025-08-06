import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAutoLogout = (timeout = 3 * 1000) => { // default 3 seconds
  const navigate = useNavigate();
  const timer = useRef();

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      // Call logout API
      axios.post("http://localhost:3000/logout", {}, { withCredentials: true })
        .then(() => {
          alert("Logged out due to inactivity");
          navigate("/login");
        })
        .catch(() => {
          navigate("/login");
        });
    }, timeout);
  };

  useEffect(() => {
    // List of events to consider as user activity
    const events = ["mousemove", "keydown", "click", "scroll"];

    // Reset timer on any of these events
    events.forEach(event => window.addEventListener(event, resetTimer));

    // Start the timer initially
    resetTimer();

    // Cleanup on unmount
    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return null; // This hook doesn’t render anything
};

export default useAutoLogout;
