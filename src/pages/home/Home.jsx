import Banner from "./Banner";
import Featured from "./Featured";

const Home = () => {
  return (
    <div className="">
      <div>
        <Banner></Banner>
      </div>
      <div className="bg-[#F4F4F4] h-screen flex items-center">
        <Featured></Featured>
      </div>
    </div>
  );
};

export default Home;
