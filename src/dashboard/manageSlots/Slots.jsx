import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import { useRef, useState } from "react";
import { FaEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import useAuthContext from "../../hooks/useAuthContext";
import emailjs from "@emailjs/browser";

const Slots = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();
  // const [bookInfo, setBookInfo] = useState(null);

  const { data: slots, refetch } = useQuery({
    queryKey: ["slots"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainerSlots`);
      return res.data;
    },
  });
  const item2 = slots?.result2?.map((i) => i.slot_time);
  console.log(slots?.result2);

  // const handleConfirmBook = (slot) => {
  //   const result = slots?.result2?.find((i) => i.slot_time === slot);
  //   setBookInfo(result);
  // };
  // const Button = ({ slot }) => {
  //   return (
  //     <div>
  //       <button
  //         className="text-xl"
  //         onClick={() => [
  //           document.getElementById("my_modal_4").showModal(),
  //           setBookInfo(result),
  //         ]}
  //       >
  //         <FaEye></FaEye>
  //       </button>
  //       <dialog id="my_modal_4" className="modal">
  //         <div className="modal-box">
  //           <form method="dialog">
  //             <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
  //               ✕
  //             </button>
  //           </form>
  //           <div>
  //             <h3>
  //               <span className="font-semibold">Booking Id : </span>
  //               {bookInfo?.booking_id}
  //             </h3>
  //             <h3>
  //               <span className="font-semibold">User Email : </span>
  //               {bookInfo?.userEmail}
  //             </h3>
  //             <h3>
  //               <span className="font-semibold">Trainer Email : </span>
  //               {bookInfo?.trainerEmail}
  //             </h3>
  //             <h3>
  //               <span className="font-semibold">Package Type : </span>
  //               {bookInfo?.pack_type}
  //             </h3>
  //             <h3>
  //               <span className="font-semibold">Slot Time : </span>
  //               {bookInfo?.slot_time}
  //             </h3>
  //           </div>
  //           <div className="modal-action justify-between">
  //             <form method="dialog">
  //               <button
  //                 onClick={() => handleConfirmReject()}
  //                 className="btn btn-sm"
  //               >
  //                 Confirm
  //               </button>
  //             </form>
  //             <form method="dialog">
  //               <button
  //                 onClick={() => handleConfirmReject()}
  //                 className="btn btn-sm"
  //               >
  //                 Reject
  //               </button>
  //             </form>
  //           </div>
  //         </div>
  //       </dialog>
  //     </div>
  //   );
  // };

  const handleConfirmReject = (id, role) => {
    console.log(id, role);
    axiosSecure.patch(`/bookingTrainer/${id}`, { role }).then((res) => {
      console.log(res.data);
      toast.success(`Successfully maked ${role}`);
      refetch();
    });
  };

  const sendEmail = (name, email) => {
    const Data = {
      user_name: name,
      user_email: email,
      message:
        "Thank you for considering me for your training. After careful consideration, I regret to inform you that I won't be able to proceed with your booking at this time. I appreciate your understanding and wish you continued success on your fitness journey.",
    };
    console.log(Data);
    emailjs
      .send("service_y8qs7rp", "template_mvrqix9", Data, "Zm9TaDnGdNC8JKFDC")
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Successfully sended.");
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  return (
    <div className="lg:px-10">
      <div>
        <SectionTitle>My Slots</SectionTitle>
      </div>
      <div className="overflow-x-auto text">
        {/* day slot table */}
        <table className="table">
          {/* head */}
          <thead className="text-lg">
            <tr>
              <th>#</th>
              <th>Slots Time In A Day</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {slots?.result?.dayTime?.map((i, index) => (
              <tr key={i._id}>
                <td>{index + 1}</td>
                <td>{i.slots}</td>
                {/* <td>{console.log(i.slots)}</td> */}
                {/* <td>{console.log(item2[index])}</td> */}
                <td>{item2.map((i2) => (i2 === i.slots ? "booked" : ""))}</td>
                {/* <td>
                  {item2.map((i2, index) =>
                    i2 === i.slots ? (
                      <Button slot={i.slots} key={index}></Button>
                    ) : (
                      ""
                    )
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* week slot table */}
        <table className="table mt-10">
          {/* head */}
          <thead className="text-lg">
            <tr>
              <th>#</th>
              <th>Slots Time In A Week</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {slots?.result?.weekTime?.map((i, index) => (
              <tr key={i._id}>
                <td>{index + 1}</td>
                <td>{i.slots}</td>
                <td>{item2[index] === i.slots ? "booked" : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* booked slot table */}
        <table className="table mt-10">
          {/* head */}
          <thead className="text-lg">
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Booked Slots</th>
              <th>Pack Type</th>
              <th>Aciton</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {slots?.result2?.map((i, index) => (
              <tr key={i._id}>
                <td>{index + 1}</td>
                <td>{i.user_email}</td>
                <td>{i.slot_time}</td>
                <td>{i.pack_name}</td>
                <td className="space-x-5">
                  <button
                    onClick={() => handleConfirmReject(i._id, "member")}
                    className="btn btn-sm"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => [
                      handleConfirmReject(i._id, "reject"),
                      sendEmail(i.user_name, i.user_email),
                    ]}
                    className="btn btn-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Slots;
