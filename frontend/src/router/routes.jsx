import { createBrowserRouter } from "react-router-dom";
import Layout from "../views/Layout/LayoutPage";
import ErrorPage from "../views/Layout/ErrorPage";
import ExchangeRecordDetail from "../views/ExchangeRecordDetail/index";
import IncomeDetail from "../views/IncomeDetail";

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
    ],
  },
]);

export default router;
