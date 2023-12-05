import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../../hooks/useAuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";

const Activity = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();
  console.log(user?.email);
  const { data: userActivity } = useQuery({
    queryKey: ["activity"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/memberActivity`, {email : user?.email});
      console.log(res.data);
      return res.data;
    },
  });
  console.log(userActivity);

  return (
    <div className="md:px-10 px-3">
      <SectionTitle>Your Activity Log</SectionTitle>
      <div>
        { userActivity?.map((i) => (
          <div key={i._id}>
            <div className="max-w-3xl mx-auto px-2">
              <div className="border-black border p-3 md:p-10 mt-5">
                <div className="flex justify-between border-b border-black pb-4">
                  <div>
                    <p className="font-bold text-lg italic">Your Trainer</p>
                  </div>
                  <p className="font-bold text-lg italic">{i.trainer_name}</p>
                </div>
                <div className="flex justify-between border-b border-black py-4">
                  <div>
                    <p className="font-bold text-lg italic">
                      Personal Training time
                    </p>
                  </div>
                  <p className="font-bold text-lg italic">
                    1hour
                  </p>
                </div>
                <div className="flex justify-between border-b border-black py-4">
                  <div>
                    <p className="font-bold text-lg italic">Slot Time</p>
                  </div>
                  <p className="font-bold text-lg italic">
                    {i.slot_time}
                  </p>
                </div>
                <div className="flex justify-between border-b border-black py-4">
                  <div>
                    <p className="font-bold text-lg italic">Your Pack Name</p>
                  </div>
                  <p className="font-bold text-lg italic">
                    {i.pack_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
