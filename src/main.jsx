import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Myrouter from "./routers/RouterProvider";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AuthProvider from "./routers/AuthProvider";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Myrouter}></RouterProvider>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
