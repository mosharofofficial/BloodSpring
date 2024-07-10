import React from "react";
import PropTypes from "prop-types";

const AdminDashboardHome = ({ user }) => {
  return (
    <div className="bg-crimson  text-white pb-5">
      <h1 className="text-4xl font-bold py-5 text-center border-b-[4px] border-white mb-5">
        Welcome {user.name}
        {/* {console.log(latestThree)} */}
      </h1>
    </div>
  );
};

AdminDashboardHome.propTypes = {
  user: PropTypes.object,
};

export default AdminDashboardHome;
