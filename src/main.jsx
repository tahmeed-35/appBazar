import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, defer } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Apps from "./pages/Apps";
import Installation from "./pages/Installation";
import ErrorPage from "./pages/ErrorPage";
import AppDetails from "./pages/AppDetails";

const appsLoader = () => {
  return defer({
    appsPromise: fetch("/app-data.json").then((res) => {
      // Small artificial delay to show nice suspense effect
      return new Promise(resolve => setTimeout(() => resolve(res.json()), 800));
    })
  });
};

import { LoadingFallback } from "./components/LoadingFallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: appsLoader,
      },
      {
        path: "/apps",
        element: <Apps />,
        loader: appsLoader,
      },
      {
        path: "/app/:id",
        element: <AppDetails />,
        loader: appsLoader,
      },
      {
        path: "/installation",
        element: <Installation />,
        loader: appsLoader,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
