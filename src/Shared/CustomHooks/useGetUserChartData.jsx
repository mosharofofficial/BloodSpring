import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "./useAxiosSecure";

const useGetUserChartData = () => {
  const axiosSecure = useAxiosSecure();
  const [chartData, setChartData] = useState([]);
  const [districtCount, setDistrictCount] = useState({});

  useEffect(() => {
    axiosSecure
      .get(`/userChartData`)
      .then((res) => {
        setChartData(res.data);
      })
      .catch((e) => console.log(e.message));
  }, []);

  useEffect(() => {
    if (chartData.length) {
      // get district names array :
      const districtArray = chartData.map((districtObject) => {
        return districtObject.district;
      });

      //   get district count object :

      const districtCountObject = {};
      districtArray.map((district) => {
        if (Object.keys(districtCountObject).includes(district)) {
          districtCountObject[district] = districtCountObject[district] + 1;
        } else {
          districtCountObject[district] = 1;
        }
      });

      const dataArray = Object.keys(districtCountObject).map((key) => {
        return { District: key, Users: districtCountObject[key] };
      });
      setDistrictCount(dataArray);
    }
  }, [chartData]);

  // console.log(districtCount)

  const districtData = {
    districtArray: districtCount,
    loading: !Object.keys(districtCount).length || false,
  };

  return districtData;
};

useGetUserChartData.propTypes = {};

export default useGetUserChartData;
