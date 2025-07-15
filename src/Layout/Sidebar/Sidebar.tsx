import { useContext } from "react";
import {
  Home,
  Explore,
  Search,
  Reels,
  Messages,
  Notification,
  Create,
  Thread,
  Menu,
  Instagram,
} from "../../utils/icons";
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
    <div
      className={`sidebar ${
        sidebar ? "" : "small-sidebar"
      } h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 border-r border-r-gray-600 scrollbar-track-gray-100 lg:pr-[3%] pr-[1%]`}
    >
      <div>
        {sidebar ? (
          <img
            src="https://www.vectorlogo.zone/logos/instagram/instagram-wordmark.svg"
            alt=""
            className={`w-28 h-12 ${theme === "light" ? "" : "filter invert"}`}
          />
        ) : (
          <Instagram className="text-3xl"/>
        )}
      </div>

      <div className="pt-10">
        <ul>
          <li className="side-link ">
            <Home className="text-3xl " />
            <a
              href="#home"
              className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
            >
              Home
            </a>
          </li>
          <li className="side-link" onClick={() => setSidebar(!sidebar)}>
            <Search className="text-3xl" />
            <a
              href="#about"
              className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
            >
              Search
            </a>
          </li>
          <li className="side-link">
            <Explore className="text-3xl" />
            <a
              href="#services"
              className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
            >
              Explore
            </a>
          </li>
          <li className="side-link">
            <Reels className="text-3xl" />
            <a
              href="#contact"
              className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
            >
              Reels
            </a>
          </li>
          <li className="side-link">
            <Messages className="text-3xl" />
            <a
              href="#contact"
              className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
            >
              Messages
            </a>
          </li>
          <li className="side-link">
            <Notification className="text-3xl" />
            <a
              href="#contact"
              className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
            >
              Notification
            </a>
          </li>
          <li className="side-link">
            <Create className="text-3xl" />
            <a
              href="#contact"
              className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
            >
              Create
            </a>
          </li>
          <li className="side-link">
            <img
              src="/assets/jack.png"
              alt=""
              className="w-6 h-6 rounded-full"
            />
            <a
              href="#contact"
              className={`w-4 ${sidebar ? "" : "hidden"} ml-3`}
            >
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
            className="toggle toggle-xs mr-2 "
            defaultChecked
          />
          <p className="text-xl">{theme === "light" ? "Dark" : "Light"}</p>
        </div>
      </div>

      <div className="pt-10">
        <ul>
          <li className="side-link" onClick={() => setSidebar(!sidebar)}>
            <Thread className="text-3xl" />
            <a
              href="#about"
              className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
            >
              Threads
            </a>
          </li>
          <li className="side-link" onClick={() => setSidebar(!sidebar)}>
            <Menu className="text-3xl" />
            <a
              href="#about"
              className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
            >
              More
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
