import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, defer } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Apps from "./pages/Apps";
import Installation from "./pages/Installation";
import ErrorPage from "./pages/ErrorPage";

export const appsLoader = () => {
  return defer({
    appsPromise: fetch("/app-data.json").then((res) => {
      // Small artificial delay to show nice suspense effect
      return new Promise(resolve => setTimeout(() => resolve(res.json()), 800));
    })
  });
};

export const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center w-full min-h-[40vh] py-16">
    <span className="loading loading-spinner loading-lg text-purple-500 h-16 w-16"></span>
    <p className="mt-4 font-bold text-slate-500 animate-pulse text-lg">Loading AppBazar Data...</p>
  </div>
);

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
