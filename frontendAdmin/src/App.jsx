import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import NewApplication from "./pages/NewApplication";
import EditAppplication from "./pages/EditAppplication";

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem("adminAuthToken") ? true : false;
  });

  const handleLoginSuccess = (token) => {
    sessionStorage.setItem("adminAuthToken", token || "authenticated");
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthToken");
    localStorage.removeItem("adminAuthToken");
    setIsAdminLoggedIn(false);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Admin-Login" replace />} />
      <Route
        path="/Admin-Login"
        element={
          <AdminLogin
            isAdminLoggedIn={isAdminLoggedIn}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
          />
        }
      />
      <Route
        path="/new-application"
        element={
          isAdminLoggedIn ? (
            <NewApplication
              isAdminLoggedIn={isAdminLoggedIn}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/Admin-Login" replace />
          )
        }
      />
      <Route
        path="/edit-application"
        element={
          isAdminLoggedIn ? (
            <EditAppplication
              isAdminLoggedIn={isAdminLoggedIn}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/Admin-Login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/Admin-Login" replace />} />
    </Routes>
  );
}

export default App;
