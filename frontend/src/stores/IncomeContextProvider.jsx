import React from "react";
import useGet from "../hooks/useIncome";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const AppContext = React.createContext({
  income: [],
});

function IncomeContextProvider({ children }) {
  // Sets up the app to fetch the inome from a REST API.

  // The context value that will be supplied to any descendants of this component.
  const context = {
    income,
    isLoading,
  };

  // Wraps the given child components in a Provider for the above context.
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export { AppContext, IncomeContextProvider };
