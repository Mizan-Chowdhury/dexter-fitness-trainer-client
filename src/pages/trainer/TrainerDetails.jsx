import { useLoaderData, useNavigate } from "react-router-dom";
import SectionTitle from "../../shared/SectionTitle";
import { Helmet } from "react-helmet";

const TrainerDetails = () => {
  const {_id, name, age, weekTime, dayTime, experience, skills, image, email, role } =
    useLoaderData();
  const navigate = useNavigate();

  const hanldeNavigate = (slot) => {
    navigate(`/trainerBooked/${slot}`, { state: { _id } });
  };

  return (
    <div className="max-w-7xl mx-auto py-36">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dexter Fitness - {name}'s Details</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <dir>
        <SectionTitle>{name}'s details</SectionTitle>
      </dir>
      <div className="md:grid grid-cols-12 items-center gap-5 space-y-8 px-3">
        <div className="col-span-3">
          <img className="rounded-full" src={image} alt="" />
        </div>
        <div className="col-span-3">
          <h1 className="font-bold text-lg mb-2">About my self :</h1>
          <p>
            <span className="font-semibold">Name :</span> {name}
          </p>
          <p>
            <span className="font-semibold">Age :</span> {age}
          </p>
          <p>
            <span className="font-semibold">Experience :</span> {experience}
          </p>
          <p>
            <span className="font-semibold">Skills :</span> {skills}
          </p>
          <p>
            <span className="font-semibold">Position :</span> Senior {role}
          </p>
          <p>
            <span className="font-semibold">Email :</span> {email}
          </p>
        </div>
        <div className="col-span-3">
          <p className="font-semibold mb-2">Available Time Slots in a day:</p>
          <ul className="">
            {dayTime.map((i) => (
              <li
                key={i}
                onClick={() => hanldeNavigate(i.slots)}
                className="btn w-full mb-2"
              >
                {i.slots}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3">
          <p className="font-semibold mb-2">Available Time Slots in a week:</p>
          <ul className="">
            {weekTime.map((i) => (
              <li
                key={i}
                onClick={() => hanldeNavigate(i.slots)}
                className="btn w-full mb-2"
              >
                {i.slots}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
