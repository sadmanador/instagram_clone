import { useContext } from "react";
import { SidebarToggleContext } from "../../context/SidebarContext/SidebarContext";

const Sidebar = () => {
  const { theme, setTheme, sidebar, setSidebar } =
    useContext(SidebarToggleContext);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "black" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="sidebar bg-amber-300">
      <h2>Sidebar</h2>
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a onClick={() => setSidebar(!sidebar)} href="#about">
            Search
          </a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <div
        onClick={toggleTheme}
        className="flex flex-row items-center side-link"
      >
        <input
          type="checkbox"
          className="toggle toggle-xs mr-2"
          defaultChecked
        />
        <p>{theme === "light" ? "🌙 Switch to Dark" : "☀️ Switch to Light"}</p>
      </div>
    </div>
  );
};

export default Sidebar;
