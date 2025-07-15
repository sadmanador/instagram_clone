import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes/router/router.tsx";
import SidebarContextProvider from "./context/SidebarContext/SidebarContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SidebarContextProvider>
        <RouterProvider router={router} />
      </SidebarContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
