import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import SectionTitle from "../../shared/SectionTitle";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const BookingPayment = () => {
  const location = useLocation();
  const packageInfo = location.state;
  const { user } = useAuthContext();
  const trainerInfo = useLoaderData();
  const [age, setAge] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  console.log(trainerInfo);


  const hanldBookingClass = () => {
    const paymentInfo = {
      pack_name: packageInfo.pack_name,
      pack_price: packageInfo.pack_price,
      booking_id: trainerInfo._id,
      slot_time: packageInfo.slot_time,
      trainer_name: trainerInfo.name,
      trainer_email: trainerInfo.email,
      user_name: user?.displayName,
      user_email: user?.email,
      user_age: age,
      role: "member",
    };
    console.log(paymentInfo);
    axiosSecure.post("/bookingTrainer", paymentInfo).then((res) => {
      console.log(res);
      toast.success("Successfully booked.");
      navigate("/trainer");
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-32">
      <SectionTitle>Payment</SectionTitle>
      <div>
        <div className="max-w-3xl mx-auto px-2">
          <h1 className="text-center font-bold text-3xl">Package Pricing</h1>
          <div className="border-black border p-3 md:p-10 mt-5">
            <div className="flex justify-between border-b border-black pb-4">
              <div>
                <p className="font-bold text-lg italic">Shower</p>
                <p className="text-sm">Cold and hot private showers.</p>
              </div>
              <p className="font-bold text-lg italic">Free</p>
            </div>
            <div className="flex justify-between border-b border-black py-4">
              <div>
                <p className="font-bold text-lg italic">Package name</p>
              </div>
              <p className="font-bold text-lg italic">
                {packageInfo.pack_name}
              </p>
            </div>

            <div className="flex justify-between border-b border-black py-4">
              <div>
                <p className="font-bold text-lg italic">Package price</p>
              </div>
              <p className="font-bold text-lg italic">
                ${packageInfo.pack_price}/month
              </p>
            </div>

            <div className="flex justify-between border-b border-black py-4">
              <div>
                <p className="font-bold text-lg italic">Your slot time</p>
              </div>
              <p className="font-bold text-lg italic">
                {packageInfo.slot_time}
              </p>
            </div>

            <div className="w-full border-b border-black py-4">
              <label className="label">
                <span className="label-text font-bold text-lg">
                  Trainer name*
                </span>
              </label>
              <input
                readOnly
                defaultValue={trainerInfo.name}
                type="text"
                className="input input-bordered w-full bg-transparent border-none font-semibold"
              />
            </div>

            <div className="w-full border-b border-black py-4">
              <label className="label">
                <span className="label-text font-bold text-lg">Your name*</span>
              </label>
              <input
                readOnly
                defaultValue={user?.displayName}
                type="text"
                className="input input-bordered w-full bg-transparent border-none font-semibold"
              />
            </div>
            <div className="w-full border-b border-black py-4">
              <label className="label">
                <span className="label-text font-bold text-lg">
                  Your email*
                </span>
              </label>
              <input
                readOnly
                defaultValue={user?.email}
                type="email"
                className="input input-bordered w-full bg-transparent border-none font-semibold"
              />
            </div>
            <div className="w-full border-b border-black py-4">
              <label className="label">
                <span className="label-text font-bold text-lg">Your age*</span>
              </label>
              <input
                required
                onChange={(e) => setAge(e.target.value)}
                type="age"
                className="input input-bordered w-full bg-transparent border-none font-semibold"
              />
            </div>
            <div className="text-center mt-10">
              <button onClick={hanldBookingClass} className="btn btn-outline">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPayment;
