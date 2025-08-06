
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.post("http://localhost:3000/logout", {}, {
      withCredentials: true
    }).then(() => {
      navigate('/login');
    }).catch(err => {
      alert("Logout failed");
      console.error(err);
    });
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
