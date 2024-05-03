import { BaseCurrencyProvider } from "../stores/BaseCurrencyContext";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../views/Layout/LayoutPage";
import ErrorPage from "../views/Layout/ErrorPage";
import ExchangeRecordDetail from "../views/ExchangeRecordDetail/index";
import IncomeDetail from "../views/IncomeDetail/IncomeDetail";
import ExpenseDetail from "../views/ExpenseDetail/ExpenseDetail";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import ChangePassword from "../views/SignUp/components/ChangePassword";
import RecordingPage from "../views/RecordingPage";
import RatesDetailPage from "../views/Detail/RatesDetailPage";
import RatesOverviewPage from "../views/Currency/RatesOverviewPage";
import ForgotPassword from "../views/ForgotPassword/index";
import { RequireAuthProvider } from "../stores/RequireAuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuthProvider>
        <BaseCurrencyProvider>
          <Layout />
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
        path: "exchange-record",
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
      <RequireAuthProvider>
        <ChangePassword />
      </RequireAuthProvider>
    ),
  },
]);

export default router;
