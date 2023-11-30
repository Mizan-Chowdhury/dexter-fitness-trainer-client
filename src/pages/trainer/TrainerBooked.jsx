import SectionTitle from "../../shared/SectionTitle";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TrainerBooked = () => {
  const axiosSecure = useAxiosSecure();
  const { time } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state._id;
  console.log(id, time);

  const hanldeNavigate = (data) => {
    const trainerBookInfo = {
      booking_id: data._id,
      slot_time: time,
      pack_name: data.type,
      pack_price: data.price
    };
    console.log(trainerBookInfo);
    navigate(`/bookingPayment/${id}`, { state: trainerBookInfo });
  };

  const { data: packages } = useQuery({
    queryKey: ["bookingPlans"],
    queryFn: async () => {
      const res = await axiosSecure(`/bookingPlans`);
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto py-36">
      <div>
        <SectionTitle>All Packages</SectionTitle>
      </div>
      <div className="md:flex justify-between gap-10 space-y-8 md:space-y-0">
        {packages?.map((i) => (
          <div className="w-full flex flex-col" key={i.id}>
            <div className="bg-[#282F3D] text-white text-center py-2">
              <h1 className="text-2xl font-semibold">{i.type}</h1>
            </div>
            <div className="flex-grow p-4">
              <div>
                <h1 className="font-bold mb-3">$<span className="text-3xl">{i.price}/</span>month</h1>
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
                  <li>{i.facilities[2] ? i.facilities[2] : "-----"}</li>
                  <li>{i.facilities[3] ? i.facilities[3] : "-----"}</li>
                </ul>
              </div>
            </div>
            <div className="px-4">
              <button
                onClick={() => hanldeNavigate(i)}
                className="btn btn-outline w-full"
              >
                Join Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerBooked;
