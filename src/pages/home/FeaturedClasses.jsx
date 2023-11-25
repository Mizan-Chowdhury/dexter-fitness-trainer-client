import { useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle";

const FeaturedClasses = () => {
  const [featuredClasses, setFeaturedClasses] = useState([]);
  useEffect(() => {
    fetch("featuredClasses.json")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedClasses(data);
      });
  }, []);
  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
        <div>
            <SectionTitle>Featured Classes</SectionTitle>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {featuredClasses.map((i) => (
          <div className="shadow-lg" key={i.id}>
            <div className="relative">
              <p className="absolute bottom-0 right-0 text-white bg-black px-1 m-2">
                {i.duration} min
              </p>
              <img className="h-44 md:h-64 w-full" src={i.image} alt="" />
            </div>
            <div className="mt-2 p-4">
              <h1 className="text-2xl font-bold">{i.title}</h1>
              <p className="my-2">{i.description.length > 170 ? <p>{i.description.slice(0,170)}... <span><button className="font-bold">read more</button></span></p> : i.description}</p>
              <li><span className="font-bold">Equipment Needed:</span> {i.equipment}</li>
              <li><span className="font-bold">Intensity:</span> {i.intensity}</li>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedClasses;
