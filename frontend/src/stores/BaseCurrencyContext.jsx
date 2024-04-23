import React, { useContext, useState } from "react";

const BaseCurrencyContext = React.createContext();

export const useCurrency = () => useContext(BaseCurrencyContext);

export const BaseCurrencyProvider = ({ children }) => {
  const [baseCurrency, setBaseCurrency] = useState("USD");

  return (
    <BaseCurrencyContext.Provider value={{ baseCurrency, setBaseCurrency }}>
      {children}
    </BaseCurrencyContext.Provider>
  );
};
