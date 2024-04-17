import { createBrowserRouter } from "react-router-dom";
import Layout from "../views/Layout/LayoutPage";
import ErrorPage from "../views/Layout/ErrorPage";
import RecordingPage from "../views/Record/RecordingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "recording",
        element: <RecordingPage />,
      }
    ], //All pages add inside here
  },
]);

export default router;
