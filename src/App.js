import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useEffect, useState } from 'react';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppContent = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const hideNavbar = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-transparent text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {!hideNavbar && <Navbar toggleTheme={toggleTheme} theme={theme} />}
      <Routes>
        <Route 
          path="/login" 
          element={localStorage.getItem('token') ? <Navigate to="/" replace /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={localStorage.getItem('token') ? <Navigate to="/" replace /> : <Register />} 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <AppContent theme={theme} toggleTheme={toggleTheme} />
    </Router>
  );
}

export default App;