import { createBrowserRouter } from "react-router-dom";
import Layout from "../views/Layout/LayoutPage";
import ErrorPage from "../views/Layout/ErrorPage";
import ExchangeRecordDetail from "../views/ExchangeRecordDetail/index";
import IncomeDetail from "../views/IncomeDetail";
import ExpenseDetail from "../views/ExpenseDetail";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import SignupUsername from "../views/SignUp/components/SignupUsername";
import SignupPassword from "../views/SignUp/components/SignupPassword";
import SignupQuestion from "../views/SignUp/components/SignupQuestion";
import SignupCurrency from "../views/SignUp/components/SignupCurrency";
import ChangePassword from "../views/SignUp/components/ChangePassword";
import RecordingPage from "../views/RecordingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
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
    children: [
      {
        index: true,
        element: <SignupUsername />,
      },
      {
        path: "password",
        element: <SignupPassword />,
      },
      {
        path: "question",
        element: <SignupQuestion />,
      },
      {
        path: "currency",
        element: <SignupCurrency />,
      },
    ],
  },

  {
    path: "/changePassword",
    element: <ChangePassword />,
  },
]);

export default router;
