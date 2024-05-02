import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (!authToken) {
      setTimeout(() => {
        alert("Please log in to access this page.");
        navigate("/login", { state: { from: location }, replace: true });
      }, 500);
    }
  }, [authToken, navigate, location]);

  return authToken ? children : null;
};

export default RequireAuth;
