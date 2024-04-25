import { BaseCurrencyProvider } from "../stores/BaseCurrencyContext";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../views/Layout/LayoutPage";
import ErrorPage from "../views/Layout/ErrorPage";
import ExchangeRecordDetail from "../views/ExchangeRecordDetail/index";
import IncomeDetail from "../views/IncomeDetail";
import ExpenseDetail from "../views/ExpenseDetail";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import ChangePassword from "../views/SignUp/components/ChangePassword";
import RecordingPage from "../views/RecordingPage";
import RatesDetailPage from "../views/Detail/RatesDetailPage";
import RatesOverviewPage from "../views/Currency/RatesOverviewPage";
import ForgotPassword from "../views/ForgotPassword/index";

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
        element: <RatesDetailPage />,
      },

      {
        path: "recording",
        element: <RecordingPage />,
      },
      {
        path: "exchange-record",
        element: <ExchangeRecordDetail />,
      },
      {
        path: "income-detail",
        element: <IncomeDetail />,
      },
      {
        path: "expense-detail",
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
    element: <ChangePassword />,
  },
]);

export default router;
