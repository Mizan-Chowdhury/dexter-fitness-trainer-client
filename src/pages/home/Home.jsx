import About from "./About";
import Articles from "./Articles";
import Banner from "./Banner";
import Featured from "./Featured";
import FeaturedClasses from "./FeaturedClasses";
import Newsletter from "./Newsletter";
import Reviews from "./Reviews";
import Team from "./Team";

const Home = () => {
  return (
    <div className="">
      <div>
        <Banner></Banner>
      </div>
      <div className="bg-[#F4F4F4] flex items-center lg:max-w-screen-2xl mx-auto py-20">
        <Featured></Featured>
      </div>
      <div>
        <About></About>
      </div>
      <div>
        <FeaturedClasses></FeaturedClasses>
      </div>
      <div>
        <Articles></Articles>
      </div>
      <div>
        <Team></Team>
      </div>
      <div>
        <Reviews></Reviews>
      </div>
      <div>
        <Newsletter></Newsletter>
      </div>
    </div>
  );
};

export default Home;
