import { createBrowserRouter } from "react-router-dom";
import Layout from "../views/Layout/LayoutPage";
import ErrorPage from "../views/Layout/ErrorPage";
import ExchangeRecordDetail from "../views/ExchangeRecordDetail/index";
import IncomeDetail from "../views/IncomeDetail";
import ExpenseDetail from "../views/ExpenseDetail";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import SignupUsername from "../views/Login/components/SignupUsername";
import SignupPassword from "../views/Login/components/SignupPassword";
import SignupQuestion from "../views/Login/components/SignupQuestion";
import SignupCurrency from "../views/Login/components/SignupCurrency";
import ChangePassword from "../views/Login/components/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
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
    path: "/signupUsername",
    element: <SignupUsername />,
  },
  {
    path: "/signupPassword",
    element: <SignupPassword />,
  },
  {
    path: "/signupQuestion",
    element: <SignupQuestion />,
  },
  {
    path: "/signupCurrency",
    element: <SignupCurrency />,
  },
  {
    path: "/changePassword",
    element: <ChangePassword />,
  },
]);

export default router;
