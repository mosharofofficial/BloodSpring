import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { myAxios } from "../../Axios.config";
import { authContext } from "../../Authentication/AuthProvider";

const DashboardHome = () => {
  const { user: firebaseUser } = useContext(authContext);

  const {
    data: latestThree = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["latestThree"],
    queryFn: async () =>
      await myAxios
        .get(`/getLatestThree?email=${firebaseUser.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => res.data),
  });

  return (
    <div className="bg-crimson  text-white pb-5">
      <h1 className="text-4xl font-bold py-5 text-center border-b-[4px] border-white mb-5">
        Welcome {firebaseUser?.name}
        {console.log(latestThree)}
      </h1>
      <div className={`${(isPending || !latestThree.length) && "hidden "} `}>
        latest 3
      </div>
    </div>
  );
};

DashboardHome.propTypes = {};

export default DashboardHome;
