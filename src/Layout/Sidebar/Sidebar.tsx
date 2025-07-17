import { useContext } from "react";
import { Link } from "react-router-dom";
import { SidebarToggleContext } from "../../context/SidebarContext/SidebarContext";
import {
  Create,
  Explore,
  Home,
  Instagram,
  Menu,
  Messages,
  Notification,
  Reels,
  Search,
  Thread,
} from "../../utils/icons";

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
          <Instagram className="text-xl" />
        )}
      </div>

      <div className="pt-10">
        <div>
          <Link to="/" className="side-link ">
            <Home className="text-xl " />
            <p className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}>
              Home
            </p>
          </Link>
          <div className="side-link" onClick={() => setSidebar(!sidebar)}>
            <Search className="text-xl" />
            <p className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}>
              Search
            </p>
          </div>
          <Link to="/explore" className="side-link">
            <Explore className="text-xl" />
            <p className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}>
              Explore
            </p>
          </Link>
          <Link to="/reels" className="side-link">
            <Reels className="text-xl" />
            <p className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}>
              Reels
            </p>
          </Link>
          <div className="side-link">
            <Messages className="text-xl" />
            <p className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}>
              Messages
            </p>
          </div>
          <div className="side-link">
            <Notification className="text-xl" />
            <p className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}>
              Notification
            </p>
          </div>
          <div className="side-link">
            <Create className="text-xl" />
            <p className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}>
              Create
            </p>
          </div>
          <div className="side-link">
            <img
              src="/assets/jack.png"
              alt=""
              className="w-6 h-6 rounded-full"
            />
            <p className={`w-4 ${sidebar ? "" : "hidden"} ml-3`}>Profile</p>
          </div>
        </div>
        <div
          onClick={toggleTheme}
          className="flex flex-row items-center side-link"
        >
          <input
            type="checkbox"
            className="toggle toggle-xs mr-2 "
            defaultChecked
          />
          <p className="text-xl">{theme === "light" ? "black" : "light"}</p>
        </div>
      </div>

      <div className="pt-10">
        <div>
          <div className="side-link" onClick={() => setSidebar(!sidebar)}>
            <Thread className="text-xl" />
            <p className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}>
              Threads
            </p>
          </div>
          <div className="side-link" onClick={() => setSidebar(!sidebar)}>
            <Menu className="text-xl" />
            <p className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}>
              More
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
