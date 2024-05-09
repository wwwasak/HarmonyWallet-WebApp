import { BaseCurrencyProvider } from "../stores/BaseCurrencyContext";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../views/Layout/LayoutPage";
import ErrorPage from "../views/Layout/ErrorPage";
import ExchangeRecordDetail from "../views/ExchangeRecordDetail/ExchangeRecordDetail";
import IncomeDetail from "../views/IncomeDetail/IncomeDetail";
import ExpenseDetail from "../views/ExpenseDetail/ExpenseDetail";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import RecordingPage from "../views/RecordingPage";
import RatesDetailPage from "../views/CurrencyDetail/RatesDetailPage.jsx";
import RatesOverviewPage from "../views/Currency/RatesOverviewPage";
import ForgotPassword from "../views/ForgotPassword/index";
import { RequireAuthProvider } from "../stores/RequireAuthContext.jsx";
import { NavigationProvider } from "../stores/RouterNavigationContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuthProvider>
        <BaseCurrencyProvider>
          <NavigationProvider>
            <Layout />
          </NavigationProvider>
        </BaseCurrencyProvider>
      </RequireAuthProvider>
    ),
    errorElement: <ErrorPage />,

    children: [
      { path: "exchangeoverview", element: <RatesOverviewPage /> },
      {
        path: "ratesDetail/:baseCurrency/:selectedCurrency",
        element: <RatesDetailPage />,
      },

      {
        path: "/",
        element: <RecordingPage />,
      },
      {
        path: "exchange",
        element: <ExchangeRecordDetail />,
      },
      {
        path: "income",
        element: <IncomeDetail />,
      },
      {
        path: "expense",
        element: <ExpenseDetail />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <NavigationProvider>
        <Login />
      </NavigationProvider>
    ),
  },
  {
    path: "/signup",
    element: (
      <NavigationProvider>
        <SignUp />
      </NavigationProvider>
    ),
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

export default router;
