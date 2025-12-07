import { createBrowserRouter } from "react-router";
import Rootlayout from "../layouts/Rootlayout";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/error/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);
