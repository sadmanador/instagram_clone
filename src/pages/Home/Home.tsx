// Home.tsx
import Feed from "../../Components/Feed/Feed";
import Suggestions from "../../Components/Suggestions/Suggestions";

const Home = () => {
  return (
    <div>
      <div className=" flex gap-2">
        <div className="avatar avatar-online">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
          </div>
        </div>
        <div className="avatar avatar-offline">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp" />
          </div>
        </div>
        <div className="avatar avatar-offline">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/distracted1@192.webp" />
          </div>
        </div>
        <div className="avatar avatar-offline">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/distracted2@192.webp" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_350px] gap-6">
        <div className="hidden lg:block" /> {/* empty left column */}
        <Feed />
        <div className="hidden lg:block">
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default Home;
