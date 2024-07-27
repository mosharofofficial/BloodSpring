import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useGetUser from "../../../Shared/CustomHooks/useGetUser";
import { myAxiosSecure } from "../../../Axios.config";
import Row from "../../../MyDonationRequests/Row";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

const AllBloodDonationReqs = () => {
  const [filter, setFilter] = useState(undefined);
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
        <div className="bg-crimson text-white min-h-[600px]">
          <div className="overflow-x-auto min-h-[500px]">
            <div className="flex justify-center ">
              <div className="dropdown dropdown-right dropdown-start">
                <div tabIndex={0} role="button" className="btn button px-2 m-0">
                  <span className="text-2xl">Filter</span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content gap-1 menu bg-white rounded-box z-[1] w-[150px] p-1 shadow border-[1px]"
                >
                  <li>
                    <button
                      onClick={() => setFilter(undefined)}
                      className="btn button px-0 min-h-[0px] h-[30px]"
                    >
                  All
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setFilter("done")}
                      className="btn button px-0 min-h-[0px] h-[30px]"
                    >
                      Done
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setFilter("canceled")}
                      className="btn button px-0 min-h-[0px] h-[30px]"
                    >
                      Canceled
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setFilter("pending")}
                      className="btn button px-0 min-h-[0px] h-[30px]"
                    >
                      Pending
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setFilter("in progress")}
                      className="btn button px-0 min-h-[0px] h-[30px]"
                    >
                      In Progress
                    </button>
                  </li>
                </ul>
              </div>
            </div>

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
                {!filter
                  ? requestsData.map((req) => {
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
                    })
                  : requestsData
                      .filter((row) => row.status === filter)
                      .map((rowData) => {
                        return (
                          <Row
                            key={rowData._id}
                            reqData={rowData}
                            role={currentUser.role}
                            refetch={refetch}
                            currentUser={currentUser}
                            // updateStatus={updateStatus}
                          ></Row>
                        );
                        // console.log(rowData);
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
