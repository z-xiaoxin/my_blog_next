"use client";

import { RouterProvider } from "react-router-dom";
import { dashRouter } from "../menu";

function DashApp() {
  return <RouterProvider router={dashRouter} />;
}

export default DashApp;
