import PropTypes from "prop-types";
import useGetRequests from "../Shared/CustomHooks/useGetRequests";
import { useEffect, useState } from "react";
import Row from "./Row";

const MyDonationRequests = () => {
  const { data: requestsData, isPending, refetch } = useGetRequests();
  const [filter, setFilter] = useState(undefined);

  // useEffect(()=>{
  //   console.log(isPending);
  //   !isPending && console.log(requestsData)
  // },[isPending])

  if (!isPending) {
    return (
      <div className="bg-crimson min-h-screen ">
        {/* {console.log(isPending)} */}
        {/* {console.log(time)} */}

        <h1 className="text-3xl text-white w-full text-center p-5 ">
          My Donation Requests
        </h1>
        <div className="bg-crimson text-white">
          <div className="overflow-x-auto min-h-[600px]">
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
                          refetch={refetch}
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
                            refetch={refetch}
                            // updateStatus={updateStatus}
                          ></Row>
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
