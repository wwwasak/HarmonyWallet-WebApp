import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import React from "react";

const RequireAuthContext = React.createContext();

export const useLoginStatus = () => useContext(RequireAuthContext);

const getUserInfo = async () => {
  const url = import.meta.env.VITE_GET_USER_INFO_URL;
  const authToken = localStorage.getItem("authToken");
  const body = {};
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  try {
    const response = await axios.post(url, body, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

export const RequireAuthProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (authToken) {
        try {
          const userInfo = await getUserInfo();
          if (!userInfo) {
            localStorage.removeItem("authToken");
            window.location = "/login";
          } else {
            setLoginStatus(true);
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          window.location = "/login";
        }
      } else {
        setTimeout(() => {
          alert("Please log in to access this page.");
          navigate("/login", { state: { from: location }, replace: true });
        }, 500);
      }
    };

    fetchUserInfo();
  }, [authToken, navigate, location]);

  return (
    <RequireAuthContext.Provider value={{ loginStatus, setLoginStatus }}>
      {children}
    </RequireAuthContext.Provider>
  );
};
