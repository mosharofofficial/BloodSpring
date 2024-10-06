import React from "react";
import PropTypes from "prop-types";
import useGetChartData from "../../../Shared/CustomHooks/useGetChartData";
// import "./districtChart.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  Label,
} from "recharts";
import useGetUserChartData from "../../../Shared/CustomHooks/useGetUserChartData";

const RequestsDistrictChart = () => {
  const { districtArray, loading: barLoading } = useGetChartData();
  const { districtArray: userDistrictArray, loading: userLoading } =
    useGetUserChartData();

  // console.log(districtArray);

  if (!barLoading && !userLoading) {
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
            <Bar dataKey="Requests" fill="#DC143C" barSize={8}>
              <LabelList
                dataKey={"Requests"}
                position={"top"}
                fontWeight={"bold"}
                fill="#DC143C"
              ></LabelList>
            </Bar>
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
            <Bar dataKey="Requests" fill="#DC143C" barSize={8}>
              <LabelList
                dataKey={"Requests"}
                position={"top"}
                fontWeight={"bold"}
                fill="#DC143C"
              ></LabelList>
            </Bar>
          </BarChart>
        </div>

        {/* users */}

        <div className="mt-5 p-4 pl-0 bg-white hidden lg:block ">
          <div className="flex items-center justify-center ">
            <h1 className="text-[#DC143C] text-xl font-bold text-center px-5 pb-2 border-b-[2px] border-[#DC143C] mb-2">
              Users Per District
            </h1>
          </div>
          <BarChart
            width={window.innerWidth - 350}
            height={300}
            data={userDistrictArray}
          >
            <XAxis dataKey="District" stroke="#DC143C" />
            <YAxis stroke="#DC143C" />
            <Tooltip
              wrapperStyle={{ color: "#DC143C", backgroundColor: "#fff" }}
            />
            <CartesianGrid stroke="#DC143C" strokeDasharray="5 5" />
            <Bar dataKey="Users" fill="#DC143C" barSize={8}>
              <LabelList
                dataKey={"Users"}
                position={"top"}
                fontWeight={"bold"}
                fill="#DC143C"
              ></LabelList>
            </Bar>
          </BarChart>
        </div>
        {/*  vertical */}
        <div className="mt-5 p-4 pl-0 bg-white flex flex-col  items-center justify-center lg:hidden">
          <div className="flex items-center justify-center ">
            <h1 className="text-[#DC143C] text-xl font-bold text-center px-5 pb-2 border-b-[2px] border-[#DC143C] mb-2">
              Users Per District
            </h1>
          </div>
          <BarChart
            width={window.innerWidth - 50}
            height={300}
            data={userDistrictArray}
          >
            <XAxis dataKey="District" stroke="#DC143C" />
            <YAxis stroke="#DC143C" />
            <Tooltip
              wrapperStyle={{ color: "#DC143C", backgroundColor: "#fff" }}
            />
            <CartesianGrid stroke="#DC143C" strokeDasharray="5 5" />
            <Bar dataKey="Users" fill="#DC143C" barSize={8}>
              <LabelList
                dataKey={"Users"}
                position={"top"}
                fontWeight={"bold"}
                fill="#DC143C"
              ></LabelList>
            </Bar>
          </BarChart>
        </div>
      </div>
    );
  } else {
    return <span className="loading loading-infinity loading-lg"></span>;
  }
};

RequestsDistrictChart.propTypes = {};

export default RequestsDistrictChart;
