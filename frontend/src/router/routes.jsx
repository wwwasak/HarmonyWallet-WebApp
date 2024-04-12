import { createBrowserRouter } from "react-router-dom";
import Layout from "../views/Layout/LayoutPage";
import ErrorPage from "../views/Layout/ErrorPage";
import Login from "../views/Login/components/Login";
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
    children: [], //All pages add inside here
  },
  { 
    path: "/login",
    element: <Login />
  },
  { 
    path: "/signupUsername",
    element: <SignupUsername />
  },
  { 
    path: "/signupPassword",
    element: <SignupPassword />
  },
  { 
    path: "/signupQuestion",
    element: <SignupQuestion />
  },
  { 
    path: "/signupCurrency",
    element: <SignupCurrency />
  },
  { 
    path: "/changePassword",
    element: <ChangePassword />
  }
  
  
]);

export default router;
