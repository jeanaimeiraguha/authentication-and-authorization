// ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/check-auth', {
      withCredentials: true
    })
    .then(res => {
      if (res.data.success) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    })
    .catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
