import React, { useEffect } from "react";
import PropTypes from "prop-types";
import useGetUser from "../../Shared/CustomHooks/useGetUser";
import { Navigate } from "react-router-dom";

const AdminFilter = ({ children }) => {
  const { data: user = {}, isPending, refetch } = useGetUser();

  if (user?.role === "admin") {
    return <>{children}</>;
  } else {
    return <Navigate to={"/forbidden"}></Navigate>;
  }
};

AdminFilter.propTypes = {
  children: PropTypes.node,
};

export default AdminFilter;
