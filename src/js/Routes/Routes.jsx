import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routeCodes } from "./routesConfig";
//views
import Home from "../Views/Home";
import Pricing from "../Views/Pricing";
import Catalog from "../Views/Catalog";
import NotFound from "../Views/NotFound";

export default function Routes() {
  const routes = createBrowserRouter([
    {
      path: routeCodes.HOMEPAGE,
      element: <Home />
    },
    {
      path: routeCodes.PRICING,
      element: <Pricing />
    },
    {
      path: routeCodes.CATALOG,
      element: <Catalog />
    },
    {
      path: routeCodes.NOT_FOUND,
      element: <NotFound />
    }
  ]);

  return <RouterProvider router={routes} />;
}
