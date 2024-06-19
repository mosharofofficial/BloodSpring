import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./Shared/ErrorPage";
import Register from "./Authentication/Register/Register";
import Login from "./Authentication/Login";
import Home from "./Home/Home";
import Search from "./SearchPage/Search";
import DonationReqs from "./DonationRequests/DonationReqs";
import Blogs from "./Blogs/Blogs";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/search",
        element: <Search></Search>,
      },
      {
        path: "/donoReqs",
        element: <DonationReqs></DonationReqs>
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>
      }
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  { path: "/login", element: <Login></Login> },
]);

export default routes;
