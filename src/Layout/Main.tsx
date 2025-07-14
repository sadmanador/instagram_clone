import { useContext } from "react";
import { SidebarToggleContext } from "../context/SidebarContext/SidebarContext";
import Home from "../pages/Home/Home";
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
        <Home />
      </div>
    </>
  );
};

export default Main;
