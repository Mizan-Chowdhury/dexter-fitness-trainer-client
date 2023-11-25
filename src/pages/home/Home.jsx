import About from "./About";
import Banner from "./Banner";
import Featured from "./Featured";
import FeaturedClasses from "./FeaturedClasses";
import Newsletter from "./Newsletter";
import Reviews from "./Reviews";

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
        <Reviews></Reviews>
      </div>
      <div>
        <Newsletter></Newsletter>
      </div>
    </div>
  );
};

export default Home;
