import React, { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useGetChartData = () => {
  const axiosSecure = useAxiosSecure();
  const [chartData, setChartData] = useState([]);
  const [districtCount, setDistrictCount] = useState({});

  useEffect(() => {
    axiosSecure
      .get(`/chartData`)
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

      const dataArray = Object.keys(districtCountObject).map(key=>{
        return {name: key, Requests: districtCountObject[key]}
      })
      setDistrictCount(dataArray);
    }
  }, [chartData]);

  // console.log(districtCount)

  const districtData = { districtArray: districtCount, loading: !(Object.keys(districtCount).length) || false};

  return districtData;
};
export default useGetChartData;
