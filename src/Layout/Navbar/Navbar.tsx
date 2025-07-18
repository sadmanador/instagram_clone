import { useContext } from "react";
import { Link } from "react-router-dom";
import { SidebarToggleContext } from "../../context/SidebarContext/SidebarContext";
import {
  Create,
  Explore,
  Home,
  Messages,
  Notification,
  Reels,
  Search
} from "../../utils/icons";

const Navbar = () => {
  const {  sidebar, setSidebar } =
    useContext(SidebarToggleContext);

  return (
    <div className="navbar bg-base-100 shadow-sm md:hidden fixed bottom-0 border-t-gray-600 border-t">
      <div className="flex justify-around w-full pt-3">
        <Link to="/" className="side-link btn btn-ghost">
          <Home className="text-3xl" />
        </Link>
        <div
          className="side-link btn btn-ghost"
          onClick={() => setSidebar(!sidebar)}
        >
          <Search className="text-3xl" />
        </div>
        <Link to="/explore" className="side-link btn btn-ghost">
          <Explore className="text-3xl" />
        </Link>
        <Link to="/reels" className="side-link btn btn-ghost">
          <Reels className="text-3xl" />
        </Link>
        <div className="side-link btn btn-ghost">
          <Messages className="text-3xl" />
        </div>
        <div className="side-link btn btn-ghost">
          <Notification className="text-3xl" />
        </div>
        <div className="side-link btn btn-ghost">
          <Create className="text-3xl" />
        </div>
        <div className="side-link btn btn-ghost">
          <img src="/assets/jack.png" alt="" className="w-6 h-6 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
