import React from "react";
import PropTypes from "prop-types";
import useGetChartData from "../../../Shared/CustomHooks/useGetChartData";
// import "./districtChart.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";


const RequestsDistrictChart = () => {
  const { districtArray, loading } = useGetChartData();
  console.log(districtArray);

  if (!loading) {
    return (
      <div>
        <div className="p-4 pl-0 bg-white hidden lg:block">
          <div className="flex items-center justify-center ">
            <h1 className="text-[#DC143C] text-xl font-bold text-center px-5 pb-2 border-b-[2px] border-[#DC143C] mb-2">
              Requests Per District
            </h1>
          </div>
          <BarChart
            width={window.innerWidth - 350}
            height={300}
            data={districtArray}
          >
            <XAxis dataKey="name" stroke="#DC143C" />
            <YAxis stroke="#DC143C" />
            <Tooltip
              wrapperStyle={{ color: "#DC143C", backgroundColor: "#fff" }}
            />
            <CartesianGrid stroke="#DC143C" strokeDasharray="5 5" />
            <Bar dataKey="Requests" fill="#DC143C" barSize={8} />
          </BarChart>
        </div>
        {/* vertical */}
        <div className="p-4 pl-0 bg-white flex flex-col  items-center justify-center lg:hidden">
          <div className="flex items-center justify-center ">
            <h1 className="text-[#DC143C] text-xl font-bold text-center px-5 pb-2 border-b-[2px] border-[#DC143C] mb-2">
              Requests Per District
            </h1>
          </div>
          <BarChart
            width={window.innerWidth - 50}
            height={300}
            data={districtArray}
          >
            <XAxis dataKey="name" stroke="#DC143C" />
            <YAxis stroke="#DC143C" />
            <Tooltip
              wrapperStyle={{ color: "#DC143C", backgroundColor: "#fff" }}
            />
            <CartesianGrid stroke="#DC143C" strokeDasharray="5 5" />
            <Bar dataKey="Requests" fill="#DC143C" barSize={8} />
          </BarChart>
        </div>
      </div>
    );
  } else {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  // return (
  //   <div>
  //     {console.log("admin log: ", (loading && "loading") || districtCount)}
  //   </div>
  // );
};

RequestsDistrictChart.propTypes = {};

export default RequestsDistrictChart;
