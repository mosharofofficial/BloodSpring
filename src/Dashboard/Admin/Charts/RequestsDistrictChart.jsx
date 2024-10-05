import React from "react";
import PropTypes from "prop-types";
import useGetChartData from "../../../Shared/CustomHooks/useGetChartData";
// import "./districtChart.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  {
    name: "Page A",
    District: 4000,
  },
  {
    name: "Page B",
    District: 3000,
  },
  {
    name: "Page C",
    District: 2000,
  },
  {
    name: "Page D",
    District: 2780,
  },
  {
    name: "Page E",
    District: 1890,
  },
  {
    name: "Page F",
    District: 2390,
  },
  {
    name: "Page G",
    District: 3490,
  },
];
// Requests;
const RequestsDistrictChart = () => {
  const { districtArray, loading } = useGetChartData();
  console.log(districtArray);

  

  if (!loading) {
    return (
      <div className="p-4 pl-0 bg-white hidden lg:flex">
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
          <Bar dataKey="Requests" fill="#DC143C" barSize={30} />
        </BarChart>
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
