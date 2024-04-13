import { createBrowserRouter } from "react-router-dom";
import Layout from "../views/Layout/LayoutPage";
import ErrorPage from "../views/Layout/ErrorPage";
import RatesDetailPage from "../views/Detail/RatesDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "ratesDetail/:baseCurrency/:selectedCurrency",
        element: <RatesDetailPage />,
      },
    ], //All pages add inside here
  },
]);

export default router;
