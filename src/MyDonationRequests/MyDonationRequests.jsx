import PropTypes from "prop-types";
import useGetRequests from "../Shared/CustomHooks/useGetRequests";
import { useEffect } from "react";
import Row from "./Row";

const MyDonationRequests = () => {
  const { data: requestsData, isPending, refetch } = useGetRequests();

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
                    <Row key={req._id} reqData={req} refetch={refetch}></Row>
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
