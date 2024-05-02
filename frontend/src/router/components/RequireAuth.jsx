import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

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

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        if (!userInfo) {
          localStorage.removeItem("authToken");
          window.location = "/login";
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        window.location = "/login";
      }
    };

    if (!authToken) {
      setTimeout(() => {
        alert("Please log in to access this page.");
        navigate("/login", { state: { from: location }, replace: true });
      }, 500);
    }

    fetchUserInfo();
  }, [authToken, navigate, location]);

  return authToken ? children : null;
};

export default RequireAuth;
