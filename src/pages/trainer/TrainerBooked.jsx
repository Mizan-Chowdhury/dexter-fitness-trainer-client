import { useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle";

const TrainerBooked = () => {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    fetch("bookingPlans.json")
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
      });
  }, []);
  console.log(packages);

  return (
    <div className="max-w-7xl mx-auto py-36">
      <div>
        <SectionTitle>All Packages</SectionTitle>
      </div>
      <div className="flex justify-between gap-10">
        {packages.map((i) => (
          <div className="w-full flex flex-col" key={i.id}>
            <div className="bg-[#282F3D] text-white text-center py-2">
              <h1 className="text-2xl font-semibold">{i.type}</h1>
            </div>
            <div className="flex-grow p-4">
              <div>
                <h1 className="font-semibold">Classes :</h1>
                <ul>
                  <li>{i.class[0]}</li>
                  <li>{i.class[1]}</li>
                </ul>
              </div>
              <div>
                <h1 className="font-semibold mt-4">Additional Facilities :</h1>
                <ul>
                  <li>{i.facilities[0]}</li>
                  <li>{i.facilities[1]}</li>
                  <li>{i.facilities[2]? i.facilities[2] : '-----'}</li>
                  <li>{i.facilities[3]? i.facilities[3] : '-----'}</li>
                </ul>
              </div>
            </div>
            <button className="btn">Join Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerBooked;
