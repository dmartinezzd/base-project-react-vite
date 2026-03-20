import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routeCodes } from "./routesConfig";
//views
import Home from "../Views/Home";
import Login from "../Views/Login/Index";
import NotFound from "../Views/NotFound";

export default function Routes() {
  const routes = createBrowserRouter([
    {
      path: routeCodes.SIGNIN,
      element: <Login />
    },
    {
      path: routeCodes.HOMEPAGE,
      element: <Home />
    },
    {
      path: routeCodes.NOT_FOUND,
      element: <NotFound />
    }
  ]);

  return <RouterProvider router={routes} />;
}