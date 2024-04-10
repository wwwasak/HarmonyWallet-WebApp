import { BaseCurrencyProvider } from "../stores/BaseCurrencyContext";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../views/Layout/LayoutPage";
import ErrorPage from "../views/Layout/ErrorPage";
import RatesOverviewPage from "../views/Currency/RatesOverviewPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BaseCurrencyProvider>
        <Layout />
      </BaseCurrencyProvider>
    ),
    errorElement: <ErrorPage />,
    children: [{ path: "exchangeoverview", element: <RatesOverviewPage /> }], //All pages add inside here
  },
]);

export default router;
