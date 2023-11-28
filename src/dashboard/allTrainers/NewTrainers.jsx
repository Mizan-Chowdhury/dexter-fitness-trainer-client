import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import { FaEye } from "react-icons/fa6";
import { useState } from "react";
import toast from "react-hot-toast";

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
    axiosSecure.patch(`/applicantTrainer/${id}`, {role, email}).then((res) => {
      console.log(res);
      toast.success("Successfully Maked Trainer.");
      refetch();
    });
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
                    <div className="modal-box text-center">
                      <img
                        className="rounded-full w-20 md:w-28 mx-auto"
                        src={trainerDetails?.image}
                        alt=""
                      />
                      <h3 className="font-bold text-lg">
                        {trainerDetails?.name}
                      </h3>
                      <h2 className="menu-title">About</h2>
                      <div className="flex">
                        <ul className="menu">
                          <li>
                            <ul>
                              <li>
                                <a>
                                  Available time in a day :{" "}
                                  {trainerDetails?.dayTime}h
                                </a>
                              </li>
                              <li>
                                <a>Experience : {trainerDetails?.experience}</a>
                              </li>
                              <li>
                                <a>Email : {trainerDetails?.email}</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                        <ul className="menu">
                          <li>
                            <ul>
                              <li>
                                <a>
                                  Available time in a week :{" "}
                                  {trainerDetails?.weekTime}h
                                </a>
                              </li>
                              <li>
                                <a>Skills : {trainerDetails?.skills}</a>
                              </li>
                              <li>
                                <a>Age : {trainerDetails?.age}</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                      <div className="modal-action justify-between">
                        <form method="dialog">
                          <button
                            onClick={() =>
                              handleConfirmReject(trainerDetails._id, "trainer", trainerDetails.email)
                            }
                            className="btn"
                          >
                            Confirm
                          </button>
                        </form>
                        <form method="dialog">
                          <button
                            onClick={() =>
                              handleConfirmReject(trainerDetails._id, "user", trainerDetails.email)
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
