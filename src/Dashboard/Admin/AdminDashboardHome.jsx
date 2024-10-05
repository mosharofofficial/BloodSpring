import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { myAxios } from "../../Axios.config";
import { FaUser } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import useAxiosSecure from "../../Shared/CustomHooks/useAxiosSecure";
import axios from "axios";
import useGetChartData from "../../Shared/CustomHooks/useGetChartData";
import RequestsDistrictChart from "./Charts/RequestsDistrictChart";

const AdminDashboardHome = ({ user }) => {
  const [userCount, setUserCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const { districtCount, loading } = useGetChartData();

  useEffect(() => {
    myAxios
      .get("/userCount")
      .then((res) => setUserCount(res.data))
      .catch((e) => console.log(e.message));

    myAxios
      .get("/requestCount")
      .then((res) => setRequestCount(res.data))
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <div className="bg-crimson  text-white pb-5 min-h-screen">
      <h1 className="text-4xl font-bold py-5 text-center border-b-[4px] border-white mb-5">
        Welcome {user.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xln:grid-cols-3 gap-3 p-3  bg-crimson ">
        <div className=" min-w-[200px]  border-[4px] border-white text-white flex flex-col items-center p-2 text-center justify-center">
          <h3 className="text-3xl">Total Users : </h3>
          <h3 className="text-4xl font-bold flex flex-row items-center gap-3 ">
            {" "}
            <span className="text-4xl ">
              <FaUser />
            </span>
            <span className="text-4xl ">{userCount} </span>
          </h3>
        </div>

        <div className=" min-w-[200px] border-y-[4px] border-[4px] border-white text-white flex flex-col items-center p-2 text-center justify-center">
          <h3 className="text-3xl">Total Fundings : </h3>
          <h3 className="text-4xl font-bold flex flex-row items-center  ">
            {" "}
            <span className="text-5xl ">
              <MdOutlineAttachMoney />
            </span>
            <span className="text-4xl ">{0} </span>
          </h3>
        </div>

        <div className=" min-w-[200px]  border-[4px] border-white text-white flex flex-col items-center p-2 text-center justify-center">
          <h3 className="text-3xl">Donation Requests : </h3>
          <h3 className="text-4xl font-bold flex flex-row items-center gap-3 ">
            {" "}
            <span className="text-5xl ">
              <BiSolidDonateBlood />
            </span>
            <span className="text-4xl ">{requestCount} </span>
          </h3>
        </div>
      </div>

      <h1 className="text-4xl font-bold py-5 text-center border-y-[4px] border-white my-5">
        Donation Data{" "}
      </h1>
      <RequestsDistrictChart></RequestsDistrictChart>
    </div>
  );
};

AdminDashboardHome.propTypes = {
  user: PropTypes.object,
};

export default AdminDashboardHome;
