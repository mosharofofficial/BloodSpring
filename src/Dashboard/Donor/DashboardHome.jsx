import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useGetUser from "../../Shared/CustomHooks/useGetUser";

const DashboardHome = () => {
  const user = useGetUser();

  return (
    <div>
      <h1 className="text-4xl font-bold py-10 text-center bg-crimson  text-white ">
        Welcome {user?.name}
        {/* {console.log("currentUser : " ,user)} */}
      </h1>
    </div>
  );
};

DashboardHome.propTypes = {};

export default DashboardHome;
