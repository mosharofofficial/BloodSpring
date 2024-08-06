import { useContext } from "react";
import PropTypes from "prop-types";
import { authContext } from "../Authentication/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRouteProvider = ({ children }) => {
  const { user, loading } = useContext(authContext);
  const path = useLocation().pathname;

  if (loading) {
    return (
      <div className="h-screen text-white bg-crimson flex items-center justify-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/login"} state={path}></Navigate>;
  }
};

PrivateRouteProvider.propTypes = {
  children: PropTypes.node,
};

export default PrivateRouteProvider;
