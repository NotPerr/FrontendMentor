import React from "react";
import ReactDOM from "react-dom/client";
import "tailwindcss/tailwind.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout";
import CountryDetail, {
  loader as detailLoader,
} from "./components/CountryDetail";
import Home, { loader as homeLoader } from "./Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} loader={homeLoader} />
      <Route path=":ccn3" element={<CountryDetail />} loader={detailLoader} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
