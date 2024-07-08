import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { myAxios } from "../../Axios.config";
import { authContext } from "../../Authentication/AuthProvider";
import { useNavigate } from "react-router-dom";
import Row from "../../MyDonationRequests/Row";

const DashboardHome = () => {
  const navigate = useNavigate();

  const { user: firebaseUser } = useContext(authContext);

  const {
    data: latestThree = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["latestThree"],
    queryFn: async () =>
      await myAxios
        .get(`/getLatestThree?email=${firebaseUser.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => res.data),
  });

  return (
    <div className="bg-crimson  text-white pb-5">
      <h1 className="text-4xl font-bold py-5 text-center border-b-[4px] border-white mb-5">
        Welcome {firebaseUser?.displayName}
        {/* {console.log(latestThree)} */}
      </h1>
      <div className={`${(isPending || !latestThree.length) && "hidden "} `}>

          <h1 className="text-center text-3xl ">Latest Donation Requests </h1>
        <div className="overflow-x-auto ">
          <table className="table table-xs ">
            <thead>
              <tr>
                <th></th>
              </tr>
              <tr className="text-white">
                <th>Recipient Name</th>
                <th>Recipient Location</th>
                <th>Donation Date</th>
                <th>Donation Time</th>
                <th>Donation Status</th>
                <th>Donor Information</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {latestThree.map((req) => {
                return (
                 <Row key={req._id} reqData={req} refetch={refetch}></Row>
                );
              })}
            </tbody>
            <tfoot>
              <tr></tr>
            </tfoot>
          </table>
        </div>
        
        <div className="flex  justify-center mt-5 pb-5 mb-5 border-b-[4px] border-white">
          <button
            onClick={() => navigate("/dashboard/my-donation-requests")}
            className="btn button "
          >
            View All My Requests
          </button>
        </div>
      </div>
    </div>
  );
};

DashboardHome.propTypes = {};

export default DashboardHome;
