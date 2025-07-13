import Home from "../pages/Home/Home";
import Sidebar from "./Sidebar/Sidebar";

const Main = () => {
  return (
    <div className="flex h-60">
      <aside className=" flex-none  p-4">
        <Sidebar />
      </aside>
      <main className="min-w-0 flex-1 overflow-auto  p-4">
        <Home />
      </main>
    </div>
  );
};

export default Main;
