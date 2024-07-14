import React from "react";
import PropTypes from "prop-types";
import { FaDropletSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BlockedPage = () => {
  return (
    <div className="min-h-[50vh] min-w-[430px] flex flex-col items-center justify-center text-crimson">
      <span className="text-[100px] sm:text-[200px]">
        <FaDropletSlash />
      </span>
      <h1 className="text-2xl font-bold sm:text-5xl ">
        You have been blocked !
      </h1>
      <h1 className="text-2xl font-bold sm:text-5xl ">
        blocked user can&apos;t do this action !
      </h1>
      <button className="btn button mt-5">
        <Link to={-1}>Go back</Link>
      </button>
    </div>
  );
};

BlockedPage.propTypes = {};

export default BlockedPage;
