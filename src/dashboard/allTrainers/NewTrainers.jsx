import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import { FaEye } from "react-icons/fa6";
import { useState } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";


const NewTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const [trainerDetails, setTrainerDetails] = useState(null);

  const { data: applicantTrainer, refetch } = useQuery({
    queryKey: ["applicantTrainer"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applicantTrainer");
      return res?.data;
    },
  });

  const handleConfirmReject = (id, role, email) => {
    console.log(id, role);
    axiosSecure
      .patch(`/applicantTrainer/${id}`, { role, email })
      .then((res) => {
        console.log(res);
        toast.success("Successfully Maked Trainer.");
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
          toast.success("Successfully mailed.");
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  return (
    <div className="lg:px-10">
      <div>
        <SectionTitle>Applicant Trainer</SectionTitle>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-lg">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {applicantTrainer?.map((i, index) => (
              <tr key={i._id}>
                <td>{index + 1}</td>
                <td>{i.name}</td>
                <td>{i.email}</td>
                <td>{i.role}</td>
                <td>
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="text-xl"
                    onClick={() => [
                      document.getElementById("my_modal_4").showModal(),
                      setTrainerDetails(i),
                    ]}
                  >
                    <FaEye></FaEye>
                  </button>
                  <dialog id="my_modal_4" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <img
                        className="rounded-full w-20 md:w-28 mx-auto"
                        src={trainerDetails?.image}
                        alt=""
                      />
                      <h3 className="font-bold text-lg text-center">
                        {trainerDetails?.name}
                      </h3>
                      <h2 className="font-bold">About</h2>
                      <div className="md:flex">
                        <ul className="flex-1">
                          <ul className="space-y-2">
                            <li>
                              <span className="font-semibold">
                                Experience :
                              </span>{" "}
                              {trainerDetails?.experience}
                            </li>
                            <li>
                              <span className="font-semibold">Email :</span>{" "}
                              {trainerDetails?.email}
                            </li>
                            <li>
                              {" "}
                              <span className="font-semibold">
                                Available Time In A Day :
                              </span>
                              {trainerDetails?.dayTime?.map((i) => (
                                <ul key={i}>
                                  <li>{i.slots}</li>
                                </ul>
                              ))}
                            </li>
                          </ul>
                        </ul>
                        <div className="divider md:divider-horizontal"></div>
                        <ul className="flex-1">
                          <ul className="space-y-2">
                            <li>
                              <span className="font-semibold">Skills :</span>{" "}
                              {trainerDetails?.skills}
                            </li>
                            <li>
                              <span className="font-semibold">Age :</span>{" "}
                              {trainerDetails?.age}
                            </li>
                            <li>
                              {" "}
                              <span className="font-semibold">
                                Available Time In A Week :
                              </span>
                              {trainerDetails?.weekTime?.map((i) => (
                                <ul key={i}>
                                  <li>{i.slots}</li>
                                </ul>
                              ))}
                            </li>
                          </ul>
                        </ul>
                      </div>
                      <div className="modal-action justify-between">
                        <form method="dialog">
                          <button
                            onClick={() =>
                              handleConfirmReject(
                                trainerDetails._id,
                                "trainer",
                                trainerDetails.email
                              )
                            }
                            className="btn"
                          >
                            Confirm
                          </button>
                        </form>
                        <form method="dialog">
                          <button
                            onClick={() =>
                              [handleConfirmReject(
                                trainerDetails._id,
                                "user",
                                trainerDetails.email
                              ),
                            sendEmail(trainerDetails?.name,trainerDetails?.email )]
                            }
                            className="btn"
                          >
                            Reject
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewTrainers;
