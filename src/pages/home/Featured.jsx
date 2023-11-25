import { useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle";

const Featured = () => {
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    fetch("featured.json")
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data);
      });
  }, []);

  return (
    <div className="lg:max-w-7xl mx-auto">
      <div >
      <SectionTitle>Our Featured</SectionTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
        {featured.map((i) => (
          <div key={i.id}>
            <div className="md:flex gap-4 bg-white p-5">
              <div>
                <img className="md:w-96" src={i.image} alt="" />
              </div>
              <div>
                <h1 className="text-lg font-bold">{i.title}</h1>
                <p className="text-slate-500">{i.description.length > 200 ? <p>{i.description.slice(0,180)}... <span><button className="font-bold">read more</button></span></p> : i.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
