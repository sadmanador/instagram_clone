import { useContext } from "react";
import { SidebarToggleContext } from "../context/SidebarContext/SidebarContext";
import Home from "../pages/Home/Home";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  const { sidebar } = useContext(SidebarToggleContext);

  return (
    <>
      <Sidebar />
      <div
        className={`${
          sidebar ? "md:pl-[17%]" : "md:pl-[7%]"
        }  pt-5 pb-5 px-[3%] ${sidebar ? "" : "lg:pl-20"}`}
      >
        <Outlet />
      </div>
      <div className="relative">
        <Navbar />
      </div>
    </>
  );
};

export default Main;
