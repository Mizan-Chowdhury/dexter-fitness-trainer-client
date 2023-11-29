import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Trainer = () => {
  const axiosSecure = useAxiosSecure();

  const { data: trainers } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers");
      return res.data;
    },
  });
console.log(trainers);
  return (
    <div className="max-w-7xl mx-auto py-20 md:py-32 px-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dexter Fitness - Trainer</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div>
        <SectionTitle>Our Trainers</SectionTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {trainers?.map((i) => (
          <div className="flex flex-col shadow-lg p-3" key={i._id}>
            <div className="text-center">
              <img className="rounded-full h-28 mx-auto" src={i.image} alt="" />
              <h1 className="font-bold text-lg">{i.name}</h1>
            </div>
            <div className="mt-2 flex-grow space-y-2">
              <p>
                <span className="font-semibold">Experience :</span>{" "}
                {i.experience}
              </p>
              <p>
                <span className="font-semibold">Age :</span> {i.age}
              </p>
              <div>
                <h1 className="font-semibold">Available time in a day :</h1>
                <ul>
                  {/* <li>{i.dayTime}</li> */}
                  {i.dayTime?.map(item=><li key={item}>{item.slots}</li>)}
                  
                </ul>
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <p className="font-semibold">Follow on :</p>
              <div className="text-2xl flex items-center gap-2">
                <a href="">
                  <FaYoutube></FaYoutube>
                </a>

                <a href="">
                  <FaFacebook></FaFacebook>
                </a>
                <a href="">
                  <FaInstagram></FaInstagram>
                </a>
              </div>
            </div>
            <div className="text-right">
              <Link to={`/trainers/${i._id}`}>
                <button className="mt-5 font-semibold">Know more...</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to={"/beATrainer"}>
          <button className="btn btn-outline font-bold">
            Become A Trainer
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Trainer;
