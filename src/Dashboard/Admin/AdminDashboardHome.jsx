import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { myAxios } from "../../Axios.config";

const AdminDashboardHome = ({ user }) => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    myAxios
      .get("/userCount")
      .then((res) => setUserCount(res.data))
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <div className="bg-crimson  text-white pb-5">
      <h1 className="text-4xl font-bold py-5 text-center border-b-[4px] border-white mb-5">
        Welcome {user.name}
        {/* {console.log(latestThree)} */}
      </h1>
      <div className=" flex justify-center">
        <div className="stats shadow bg-crimson border-[4px] border-white">
          <div className="stat text-white">
            <div className="stat-figure ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-white min-h-[50px] text-2xl">
              Total Users
            </div>
            <div className="stat-value ">{userCount}</div>
            <div className="stat-desc text-white">21% more than last month</div>
          </div>

          <div className="stat  bg-crimson border-[4px] border-white">
            <div className="stat-figure text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-white min-h-[50px]  text-2xl">
              Total Fundings
            </div>
            <div className="stat-value text-white">2.6M</div>
            <div className="stat-desc text-white">21% more than last month</div>
          </div>
          <div className="stat  bg-crimson border-[4px] border-white">
            <div className="stat-figure text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-white min-h-[50px]  text-2xl">
              Total Blood <br /> Donation Requests
            </div>
            <div className="stat-value text-white">2.6M</div>
            <div className="stat-desc text-white">21% more than last month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

AdminDashboardHome.propTypes = {
  user: PropTypes.object,
};

export default AdminDashboardHome;
