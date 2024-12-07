import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // State to store user details

  // On mount, check if there's a saved user in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user'); // Ensure the correct key
    if (savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser)); // Retrieve the user from localStorage
    }
  }, []);

  const login = (userDetails) => {
    setIsAuthenticated(true);
    setUser(userDetails); // Store user details on login
    localStorage.setItem('user', JSON.stringify(userDetails)); // Save user to localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // Clear user details on logout
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
