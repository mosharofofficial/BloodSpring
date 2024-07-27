import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useGetUser from "../../../Shared/CustomHooks/useGetUser";
import { myAxiosSecure } from "../../../Axios.config";
import Row from "../../../MyDonationRequests/Row";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

const AllBloodDonationReqs = () => {
  
  const { data: currentUser = {}, isPending } = useGetUser();
  //   const [requestsData, setRequestsData] = useState([]);

  const {
    data: requestsData = [],
    isPending: queryDataIsPending,
    refetch,
  } = useQuery({
    queryKey: ["getAllReqs"],
    queryFn: () =>
      myAxiosSecure
        .get(`/allDonationRequest?email=${currentUser.email}`)
        .then((res) => res.data),
  });

  useEffect(() => {
    if (
      !isPending &&
      !(Object.keys(currentUser).length === 0) &&
      !queryDataIsPending
    ) {
      //   myAxiosSecure
      //     .get(`/allDonationRequest?email=${currentUser.email}`)
      //     .then((res) => setRequestsData(res.data));
    }
  }, [isPending]);

  

  if (currentUser.role === "donor") {
    return <Navigate to={"/forbidden"}></Navigate>;
  }

  if (!isPending && !(Object.keys(currentUser).length === 0)) {
    return (
      <div className="bg-crimson min-h-screen ">
        {/* {console.log(isPending)} */}
        {/* {console.log(time)} */}

        <h1 className="text-3xl text-white w-full text-center p-5 ">
          All Donation Requests
        </h1>
        <div className="bg-crimson text-white">
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
                {requestsData.map((req) => {
                  return (
                    <Row
                      key={req._id}
                      reqData={req}
                      role={currentUser.role}
                      refetch={refetch}
                      currentUser={currentUser}
                      // updateStatus={updateStatus}
                    ></Row>
                  );
                })}
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

AllBloodDonationReqs.propTypes = {};

export default AllBloodDonationReqs;
