import { Outlet } from "react-router-dom";
import Navlist from "../shared/Navlist";

const Dashboard = () => {
    const user = true;
  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto">
      <div className="col-span-2 mt-10">
        <ul className="menu menu-md font-bold">
          <Navlist route={"/dashboard"}>Dashboard</Navlist>
          <Navlist route={"/dashboard/subscribers"}>All subscribers</Navlist>
          <Navlist route={"/dashboard/trainers"}>All Trainers</Navlist>
          <Navlist route={"/dashboard/newTrainers"}>Applied Trainer</Navlist>
          <Navlist route={"/dashboard/balance"}>Balance</Navlist>
          <div className="divider">Home Page</div> 
          <Navlist route={"/"}>Home</Navlist>
          <Navlist route={"/gallery"}>Gallery</Navlist>
          <Navlist route={"/trainer"}>Trainer</Navlist>
          <Navlist route={"/classes"}>Classes</Navlist>
          <Navlist route={"/community"}>Community</Navlist>
        </ul>
      </div>
      <div className="col-span-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
