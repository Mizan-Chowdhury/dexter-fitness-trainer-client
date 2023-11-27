import { Outlet } from "react-router-dom";
import Navlist from "../shared/Navlist";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  return (
    <div className="md:grid grid-cols-12 max-w-7xl space-y-4 md:space-y-0 mx-auto h-screen my-32">
      {isAdmin && (
        <div className="col-span-2">
          <h1 className="text-center text-2xl font-bold mb-5">
            Admin Dashboard
          </h1>
          <ul className="menu menu-md font-bold">
            {/* <Navlist route={"/dashboard"}>Dashboard</Navlist> */}
            <Navlist route={"/dashboard/subscribers"}>All Subscribers</Navlist>
            <Navlist route={"/dashboard/trainers"}>All Trainers</Navlist>
            <Navlist route={"/dashboard/newTrainers"}>Applied Trainers</Navlist>
            <Navlist route={"/dashboard/balance"}>Balance</Navlist>
            <Navlist route={"/dashboard/forum"}>Add New Forum</Navlist>
          </ul>
        </div>
      )}
      <div className="col-span-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
