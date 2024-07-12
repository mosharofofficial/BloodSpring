import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { myAxiosSecure } from "../../../Axios.config";
import { authContext } from "../../../Authentication/AuthProvider";
import UserRow from "./UserRow";

const AllUsers = () => {
  const { user } = useContext(authContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(user.email);

    myAxiosSecure
      .get(`/getAllUsers?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="bg-crimson text-white">
      {console.log(users[0])}
      <h1 className="text-3xl text-white w-full text-center p-5 border-b-[4px] border-white">
        All Users
      </h1>
      <div className="overflow-x-auto py-5 flex justify-center">
        <table className="table max-w-[1024px] border-x-[1px]">
          {/* head */}
          <thead>
            <tr className="border-t-[1px] text-white">
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {users.map(rowData=><UserRow key={rowData._id} rowData={rowData}></UserRow>)}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr></tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

AllUsers.propTypes = {};

export default AllUsers;
