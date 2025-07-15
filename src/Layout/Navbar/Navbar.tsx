import { useContext } from "react";
import { SidebarToggleContext } from "../../context/SidebarContext/SidebarContext";
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

const Navbar = () => {
  const { theme, setTheme, sidebar, setSidebar } =
    useContext(SidebarToggleContext);

  return (
    <div className="navbar bg-base-100 shadow-sm md:hidden fixed bottom-0 border-t-gray-600 border-t">
      <ul className="flex justify-around w-full pt-3">
        <li className="side-link btn btn-ghost">
          <Home className="text-3xl" />
          <a
            href="#home"
            className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
          >
            Home
          </a>
        </li>
        <li className="side-link btn btn-ghost" onClick={() => setSidebar(!sidebar)}>
          <Search className="text-3xl" />
          <a
            href="#about"
            className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
          >
            Search
          </a>
        </li>
        <li className="side-link btn btn-ghost">
          <Explore className="text-3xl" />
          <a
            href="#services"
            className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
          >
            Explore
          </a>
        </li>
        <li className="side-link btn btn-ghost">
          <Reels className="text-3xl" />
          <a
            href="#contact"
            className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
          >
            Reels
          </a>
        </li>
        <li className="side-link btn btn-ghost">
          <Messages className="text-3xl" />
          <a
            href="#contact"
            className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
          >
            Messages
          </a>
        </li>
        <li className="side-link btn btn-ghost">
          <Notification className="text-3xl" />
          <a
            href="#contact"
            className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
          >
            Notification
          </a>
        </li>
        <li className="side-link btn btn-ghost">
          <Create className="text-3xl" />
          <a
            href="#contact"
            className={`w-4 ${sidebar ? "" : "hidden"} ml-3 text-xl`}
          >
            Create
          </a>
        </li>
        <li className="side-link btn btn-ghost">
          <img src="/assets/jack.png" alt="" className="w-6 h-6 rounded-full" />
          <a href="#contact" className={`w-4 ${sidebar ? "" : "hidden"} ml-3`}>
            Profile
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
