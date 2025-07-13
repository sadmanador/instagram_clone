export interface SidebarContextProps {
  sidebar: boolean;
  setSidebar: (sidebar: boolean) => void;
  theme: string;
  setTheme: (theme: string) => void;
}
