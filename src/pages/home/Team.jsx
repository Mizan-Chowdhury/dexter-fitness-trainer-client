import { useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle";

const Team = () => {
  const [team, setTeam] = useState([]);
  useEffect(() => {
    fetch("team.json")
      .then((res) => res.json())
      .then((data) => {
        setTeam(data);
      });
  }, []);
  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <div>
        <SectionTitle>Meet Trainers</SectionTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {team.map((i) => (
          <div className="flex flex-col shadow-lg p-3" key={i.id}>
            <img className="w-full h-72" src={i.image} alt="" />
            <p className="font-semibold text-center">{i.position}</p>
            <div className="mt-2 flex-grow">
              <h1 className="font-bold text-lg">{i.name}</h1>
              <p>{i.about}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
