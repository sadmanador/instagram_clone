import Feed from "../../Components/Feed/Feed";
import Suggestions from "../../Components/Suggestions/Suggestions";

const Home = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4  justify-around">
      <div className="justify-self-center">
        <Feed />
      </div>
      <div className="justify-self-end">
        <Suggestions />
      </div>
    </div>
  );
};

export default Home;
