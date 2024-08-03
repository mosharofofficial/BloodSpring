import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { myAxios } from "../Axios.config";
import RequestCard from "./RequestCard";

const DonationReqs = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    myAxios
      .get("/allPendingRequest")
      .then((res) => setRequests(res.data))
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-crimson text-center mb-5">
        Blood Donation Requests
      </h1>
      <div className="border-t-[4px] border-crimson p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center  justify-center gap-2">
        {/* card component : */}

        {requests.map((reqData) => (
          <RequestCard key={reqData._id} reqDetails={reqData}></RequestCard>
        ))}
      </div>
    </div>
  );
};

DonationReqs.propTypes = {};

export default DonationReqs;
