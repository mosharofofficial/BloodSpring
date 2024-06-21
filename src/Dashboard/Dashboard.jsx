import PropTypes from "prop-types";
import { useContext } from "react";
import { MdBloodtype } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { authContext } from "../Authentication/AuthProvider";

const Dashboard = () => {
  const { user, logout } = useContext(authContext);

  return (
    <div className="drawer min-w-[430px]">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-crimson text-white lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
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
          <Link to={"/"}>
            {" "}
            <button className="btn btn-ghost gap-0 text-xl ">
              <span className="text-4xl">
                <MdBloodtype />
              </span>
              <span>BloodSpring</span>
            </button>
          </Link>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side lg:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className=" p-4 w-[300px] min-h-full bg-crimson">
          {/* Sidebar content here */}
          <li>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-crimson"
              >
                <li className="">
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li>
                  <a onClick={() => logout()}>Logout</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
