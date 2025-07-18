import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { SidebarToggleContext } from "../context/SidebarContext/SidebarContext";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

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
