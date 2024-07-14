import React from "react";
import PropTypes from "prop-types";
import { FaDropletSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="min-h-[50vh] min-w-[430px] flex flex-col items-center justify-center text-crimson">
      <span className="text-[100px] sm:text-[200px]">
        <FaDropletSlash />
      </span>
      <h1 className="text-2xl font-bold sm:text-5xl ">Page forbidden !</h1>
      <Link to={"/"}>
        <button className="btn button mt-5">Home</button>
      </Link>
    </div>
  );
};

Forbidden.propTypes = {};

export default Forbidden;
