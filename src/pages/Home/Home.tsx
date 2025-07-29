
import Feed from "../../Components/Feed/Feed";
import Story from "../../Components/Story/Story";
import Suggestions from "../../Components/Suggestions/Suggestions";

const Home = () => {
  return (
    <div>
      <Story/>
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
