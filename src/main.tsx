import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes/router/router.tsx";
import SidebarContextProvider from "./context/SidebarContext/SidebarContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SidebarContextProvider>
      <RouterProvider router={router} />
    </SidebarContextProvider>
  </StrictMode>
);
