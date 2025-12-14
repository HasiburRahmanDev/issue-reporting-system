import { createBrowserRouter } from "react-router";
import Rootlayout from "../layouts/Rootlayout";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/error/ErrorPage";
import Coverage from "../pages/coverage/Coverage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import { Component } from "react";
import AllIssues from "../pages/AllIssues/AllIssues";
import IssueDetails from "../pages/IssueDetails/IssueDetails";
import PrivateRoute from "./PrivateRoute";
import SubmitIssue from "../pages/submitIssue/SubmitIssue";

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
      {
        path: "/all-issues",
        Component: AllIssues,
      },
      {
        path: "/coverage",
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
        Component: Coverage,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/issue-details",
        element: (
          <PrivateRoute>
            <IssueDetails></IssueDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/submit-issue",
        element: (
          <PrivateRoute>
            <SubmitIssue></SubmitIssue>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
