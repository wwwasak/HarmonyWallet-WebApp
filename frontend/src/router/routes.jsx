import { BaseCurrencyProvider } from "../stores/BaseCurrencyContext";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../views/Layout/LayoutPage";
import ErrorPage from "../views/Layout/ErrorPage";
import ExchangeRecordDetail from "../views/ExchangeRecordDetail/index";
import IncomeDetail from "../views/IncomeDetail/IncomeDetailsPage";
import ExpenseDetail from "../views/ExpenseDetail/ExpenseDetail";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import ChangePassword from "../views/SignUp/components/ChangePassword";
import RecordingPage from "../views/RecordingPage";
import RatesDetailPage from "../views/Detail/RatesDetailPage";
import RatesOverviewPage from "../views/Currency/RatesOverviewPage";
import ForgotPassword from "../views/ForgotPassword/index";
import RequireAuth from "./components/RequireAuth.jsx";
console.log("Router setup loaded");
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BaseCurrencyProvider>
        <Layout />
      </BaseCurrencyProvider>
    ),
    errorElement: <ErrorPage />,

    children: [
      { path: "exchangeoverview", element: <RatesOverviewPage /> },
      {
        path: "ratesDetail/:baseCurrency/:selectedCurrency",
        element: (
          <RequireAuth>
            <RatesDetailPage />
          </RequireAuth>
        ),
      },

      {
        path: "/",
        element: (
          <RequireAuth>
            <RecordingPage />
          </RequireAuth>
        ),
      },
      {
        path: "exchange-record",
        element: (
          <RequireAuth>
            <ExchangeRecordDetail />
          </RequireAuth>
        ),
      },
      {
        path: "income",
        element: (
          <RequireAuth>
            <IncomeDetail />
          </RequireAuth>
        ),
      },
      {
        path: "expense",
        element: (
          <RequireAuth>
            <ExpenseDetail />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },

  {
    path: "/changePassword",
    element: (
      <RequireAuth>
        <ChangePassword />
      </RequireAuth>
    ),
  },
]);

export default router;
