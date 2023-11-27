import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      <div>
        <SectionTitle>Our Trainers</SectionTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {trainers?.map((i) => (
          <div className="flex flex-col shadow-lg p-3" key={i._id}>
            <div className="text-center">
              <img className="rounded-full h-28 mx-auto" src={i.image} alt="" />
              <h1 className="font-bold text-lg">{i.name}</h1>
            </div>
            <div className="mt-2 flex-grow">
              <p>
                <span className="font-semibold">Experience :</span>{" "}
                {i.experience}
              </p>
              <p>
                <span className="font-semibold">Age :</span> {i.age}
              </p>
              <p>
                <span className="font-semibold">Available Time :</span>{" "}
                {i.weekTime}h in a week,
                <br /> {i.dayTime}h in a day
              </p>
            </div>
            <div className="flex gap-4">
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
