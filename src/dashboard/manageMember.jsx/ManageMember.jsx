import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import useAuthContext from "../../hooks/useAuthContext";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import toast from "react-hot-toast";

const ManageMember = () => {
  const { user } = useAuthContext();
  const axiosSecure = useAxiosSecure();
  const { data: allMember } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allMember/${user?.email}`);
      return res.data;
    },
  });

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);
    emailjs
      .sendForm(
        "service_y8qs7rp",
        "template_mvrqix9",
        form.current,
        "Zm9TaDnGdNC8JKFDC"
      )
      .then(
        (result) => {
          console.log(result);
          toast.success("Successfully mailed.");
          e.target.reset();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="lg:px-10">
      <div>
        <SectionTitle>All Member</SectionTitle>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-lg">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Slots Time</th>
              <th>Instructions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allMember?.map((i, index) => (
              <tr key={i._id}>
                <td>{index + 1}</td>
                <td>{i.user_name}</td>
                <td>{i.user_email}</td>
                <td>{i.slot_time}</td>
                <td>
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn btn-sm"
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }
                  >
                    Send Email
                  </button>
                  <dialog id="my_modal_4" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <form ref={form} onSubmit={sendEmail}>
                        <label className="label">
                          <span className="label-text font-bold text-lg">
                            Member Name
                          </span>
                        </label>
                        <input
                          name="user_name"
                          type="text"
                          placeholder="Name"
                          className="input input-bordered w-full"
                        />
                        <label className="label">
                          <span className="label-text font-bold text-lg">
                            Email Address
                          </span>
                        </label>
                        <input
                          name="user_email"
                          type="email"
                          placeholder="Email"
                          className="input input-bordered w-full"
                        />

                        <label className="label">
                          <span className="label-text font-bold text-lg">
                          Instructions
                          </span>
                        </label>
                        <textarea
                          name="message"
                          rows={5}
                          className="textarea textarea-bordered w-full"
                          placeholder="Instructions"
                        ></textarea>
                        <input
                          className="btn float-right mt-5"
                          type="submit"
                          value="Send"
                        />
                      </form>
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

export default ManageMember;
