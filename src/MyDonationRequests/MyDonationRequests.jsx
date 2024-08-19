import PropTypes from "prop-types";
import useGetRequests from "../Shared/CustomHooks/useGetRequests";
import { useEffect, useState } from "react";
import Row from "./Row";
import useGetUser from "../Shared/CustomHooks/useGetUser";
import MyDonationRow from "./MyDonationRow";

const MyDonationRequests = () => {
  const { data: requestsData, isPending, refetch } = useGetRequests();
  const [filter, setFilter] = useState(undefined);

  const {
    data: currentUser = {},
    isPending: userPending,
    refetch: userRefetch,
  } = useGetUser();

  useEffect(() => {
    currentUser;
  }, [currentUser]);

  if (!isPending && !userPending) {
    return (
      <div className="bg-crimson min-h-screen ">
        {/* {console.log(isPending)} */}
        {/* {console.log(time)} */}

        <h1 className="text-3xl text-white w-full text-center p-5 ">
          My Donation Requests
        </h1>
        <div className="bg-crimson text-white">
          <div className="overflow-x-auto  min-h-[400px]">
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
                        <MyDonationRow
                          key={req._id}
                          reqData={req}
                          refetch={refetch}
                          currentUser={currentUser}
                        ></MyDonationRow>
                      );
                    })
                  : requestsData
                      .filter((row) => row.status === filter)
                      .map((rowData) => {
                        return (
                          <MyDonationRow
                            key={rowData._id}
                            reqData={rowData}
                            currentUser={currentUser}
                            refetch={refetch}
                            // updateStatus={updateStatus}
                          ></MyDonationRow>
                          // console.log(rowData)
                        );
                      })}
                <tr>
                  <td></td>
                </tr>
              </tbody>
              <tfoot>
                <tr></tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

MyDonationRequests.propTypes = {};

export default MyDonationRequests;
