import { BaseCurrencyProvider } from "../stores/BaseCurrencyContext";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../views/Layout/LayoutPage";
import ErrorPage from "../views/Layout/ErrorPage";
import RatesDetailPage from "../views/Detail/RatesDetailPage";
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

    children: [
    { path: "exchangeoverview", element: <RatesOverviewPage /> },
      {
        path: "ratesDetail/:baseCurrency/:selectedCurrency",
        element: <RatesDetailPage />,
      },
    ], //All pages add inside here
  },
]);

export default router;
