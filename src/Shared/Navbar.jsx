import PropTypes from "prop-types";
import { MdBloodtype } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  const links = (
    <>
      <li>
        <Link to={"/DonoReqs"}>Donation Requests</Link>
      </li>
      <li>
        <Link to={"/blogs"}>Blogs</Link>
      </li>
    </>
  );

  return (
    <div className=" bg-crimson">
      <div className="max-w-[1280px] mx-auto navbar text-white justify-between mb-5 ">
        <div className="navbar-start w-auto">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  bg-crimson text-white text-lg  mt-3 z-[1] p-2 shadow rounded-box w-52"
            >
              {links}
            </ul>
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
        <div className="navbar-center hidden lg:flex">
          <ul className="menu  menu-horizontal  px-1">{links}</ul>
        </div>
        <div className="navbar-end w-auto">
          <div className="flex gap-1 items-center justify-center">
            <button className="btn button">
              <Link to={"/login"}>LogIn</Link>
            </button>
            <button className="btn button">
              <Link to={"/register"}>SignUp</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
