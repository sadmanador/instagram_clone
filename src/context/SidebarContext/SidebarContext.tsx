import { createContext, useEffect, useState, type ReactNode } from "react";
import type { SidebarContextProps } from "../../types";

const defaultContextValue: SidebarContextProps = {
  sidebar: true,
  setSidebar: () => {},
  theme: "light",
  setTheme: () => {},
};

export const SidebarToggleContext = createContext(defaultContextValue);
const SidebarContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebar, setSidebar] = useState<boolean>(true);

  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <SidebarToggleContext.Provider
      value={{ sidebar, setSidebar, theme, setTheme }}
    >
      {children}
    </SidebarToggleContext.Provider>
  );
};

export default SidebarContextProvider;
