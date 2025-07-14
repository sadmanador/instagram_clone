import { useContext } from "react";
import { SidebarToggleContext } from "../../context/SidebarContext/SidebarContext";

import {
  MdHomeFilled,
  MdOutlineExplore,
  MdSearch,
  MdOutlineOndemandVideo,
  MdMessage,
} from "react-icons/md";

import { FaRegHeart } from "react-icons/fa";

import { FaPlusSquare } from "react-icons/fa";

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
    <div
      className={`sidebar ${
        sidebar ? "" : "small-sidebar"
      } h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 bg-yellow-300 scrollbar-track-gray-100`}
    >
      <ul>
        <li className="side-link">
          <MdHomeFilled />
          <a href="#home" className={`w-4 ${sidebar ? "" : "hidden"} ml-3`}>
            Home
          </a>
        </li>
        <li className="side-link" onClick={() => setSidebar(!sidebar)}>
          <MdSearch />
          <a href="#about" className={`w-4 ${sidebar ? "" : "hidden"} ml-3`}>
            Search
          </a>
        </li>
        <li className="side-link">
          <MdOutlineExplore />
          <a href="#services" className={`w-4 ${sidebar ? "" : "hidden"} ml-3`}>
            Explore
          </a>
        </li>
        <li className="side-link">
          <MdOutlineOndemandVideo />
          <a href="#contact" className={`w-4 ${sidebar ? "" : "hidden"} ml-3`}>
            Reels
          </a>
        </li>
        <li className="side-link">
          <MdMessage />
          <a href="#contact" className={`w-4 ${sidebar ? "" : "hidden"} ml-3`}>
            Messages
          </a>
        </li>
        <li className="side-link">
          <FaRegHeart />
          <a href="#contact" className={`w-4 ${sidebar ? "" : "hidden"} ml-3`}>
            Notification
          </a>
        </li>
        <li className="side-link">
          <FaPlusSquare />
          <a href="#contact" className={`w-4 ${sidebar ? "" : "hidden"} ml-3`}>
            Create
          </a>
        </li>
        <li className="side-link">
          <img
            src="/assets/jack.png"
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <a href="#contact" className={`w-4 ${sidebar ? "" : "hidden"} ml-3`}>
            Profile
          </a>
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
