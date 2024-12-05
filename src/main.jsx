import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import AuthContextProvider from "./Context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



const queryClient = new QueryClient()
createRoot(document.getElementById("root")).render(
  <QueryClientProvider  client={queryClient}>
    <AuthContextProvider>
    <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </AuthContextProvider>
  </QueryClientProvider>
);
