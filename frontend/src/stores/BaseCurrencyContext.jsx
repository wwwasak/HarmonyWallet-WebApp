import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

export const BaseCurrencyContext = React.createContext({});

export const useCurrency = () => useContext(BaseCurrencyContext);

export const BaseCurrencyProvider = ({ children }) => {
  const [baseCurrency, setBaseCurrency] = useState("USD");

  useEffect(() => {
    const fetchUserInfo = async () => {
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
        const userBaseCurrency = response.data.base_currency || "USD";
        setBaseCurrency(userBaseCurrency);
      } catch (error) {
        console.error("Error fetching user info:", error);
        // Set base currency to USD if user info cannot be fetched
        setBaseCurrency("USD");
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <BaseCurrencyContext.Provider value={{ baseCurrency, setBaseCurrency }}>
      {children}
    </BaseCurrencyContext.Provider>
  );
};
