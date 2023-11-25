import { Link } from "react-router-dom";
import Navlist from "../shared/Navlist";

import logo from "../assets/logo/light-logo.png";
import logo2 from "../assets/logo/drk-logo.png";
import { useState } from "react";

const Navbar = () => {
  const [fix, setFix] = useState(false);
  const user = true;

  const navList = (
    <>
      <Navlist route={"/"}>Home</Navlist>
      <Navlist route={"/gallery"}>Gallery</Navlist>
      <Navlist route={"/trainer"}>Trainer</Navlist>
      <Navlist route={"/classes"}>Classes</Navlist>
      <Navlist route={"/community"}>Community</Navlist>
    </>
  );

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      setFix(true);
    } else {
      setFix(false);
    }
  });

  const handleLogOut = () => {
    console.log("logout");
  };

  return (
    <div className={`navbar fixed z-[3] p-4 md:px-10 top-0 left-0 right-0 max-w-7xl mx-auto`}>
      <div className="navbar-start">
        <div>
          <Link to={"/"}>
            <img className="w-36" src={logo} alt="" />
          </Link>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal space-x-6 font-bold text-white active-hover">
          {navList}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-5">
        {user ? (
          <div>
            <div className="dropdown hidden md:block">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-16 rounded-full">
                  {/* <img src={user?.photoURL ? user?.photoURL : avater} alt="" /> */}
                </div>
              </label>
              <div
                tabIndex={0}
                className="dropdown-content w-60 mt-2 z-[3] -ml-48 border rounded p-6 shadow text-neutral-content bg-black"
              >
                <div>
                  {/* <img
                  className="rounded-full w-16 h-16 mx-auto"
                  src={user?.photoURL ? user?.photoURL : avater}
                  alt=""
                /> */}
                  <h1 className="text-white text-xl text-center pt-2 pb-6">
                    {user?.displayName}
                  </h1>
                </div>
                <ul className="text-lg">
                  <li className="lg:hidden">{navList}</li>
                  <li>
                    <Link
                      onClick={handleLogOut}
                      className="flex items-center gap-1"
                      to={"/"}
                    >
                      <span>Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="drawer drawer-end md:hidden">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer-4"
                  className="btn btn-square btn-ghost text-slate-500"
                >
                  <svg
                xmlns=""
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content font-semibold">
                  {navList}
                  
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <Link className={"py-1 px-4 font-bold bg-[#EEA72B]"} to={"/login"}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;