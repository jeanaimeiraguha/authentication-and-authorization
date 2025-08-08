// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import ProtectedRoute from './pages/ProtectedRoute';
import BankApp from './pages/Banking';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Public route */}
        <Route path="/logout" element={<Logout />} />

        {/* Public or protected BankApp route (depends on your design) */}
        <Route path="/banking" element={<BankApp />} />
      </Routes>
    </Router>
  );
}

export default App;
