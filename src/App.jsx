import React, { useEffect, useState } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProfileSelectionScreen from './screens/ProfileSelectionScreen';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  // Simulate persistent login state
  useEffect(() => {
    const unsubscribe = () => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser));
      } else {
        setUser(null);
      }
    };
    unsubscribe();
  }, []);

  const login = (email) => {
    const newUser = { email };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  }

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <div className="app bg-[#111] min-h-screen">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path="/profiles" element={<ProfileSelectionScreen />} />
            <Route path="/profile" element={<ProfileScreen user={user} signOut={logout} />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/" element={<Navigate to="/profiles" />} />
            <Route path="*" element={<Navigate to="/profiles" />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
