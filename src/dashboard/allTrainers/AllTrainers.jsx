import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";

const AllTrainers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: AllTrainers } = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allTrainers");
      return res.data;
    },
  });

  console.log(AllTrainers);

  return (
    <div className="lg:px-10">
      <div>
        <SectionTitle>All Trainers</SectionTitle>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-lg">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Payment Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {AllTrainers?.map((i, index) => (
              <tr key={i._id}>
                <td>{index + 1}</td>
                <td>{i.name}</td>
                <td>{i.email}</td>
                <td>{i.payment}</td>
                <td>
                  <button className="btn btn-sm">Pay</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTrainers;
