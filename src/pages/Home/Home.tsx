import Feed from "../../components/Feed/Feed";
import Story from "../../components/Story/Story";
import Suggestions from "../../components/Suggestions/Suggestions";

const Home = () => {
  return (
    <>
      <Story />
      <div className="relative flex flex-col items-center">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-[600px]">
            <Feed />
          </div>
        </div>

        <div className="hidden lg:block absolute top-[100px] right-8 w-[350px]">
          <Suggestions />
        </div>
      </div>
    </>
  );
};

export default Home;
