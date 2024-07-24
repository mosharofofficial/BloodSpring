import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { myAxiosSecure } from "../../../Axios.config";
import { authContext } from "../../../Authentication/AuthProvider";
import UserRow from "./UserRow";
import useGetUser from "../../../Shared/CustomHooks/useGetUser";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const { user } = useContext(authContext);
  const [users, setUsers] = useState([]);
  const { data: currentUser = {}, isPending } = useGetUser();

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(currentUser.role);

    if (!isPending && !(Object.keys(currentUser) === 0)) {
      myAxiosSecure
        .get(`/getAllUsers?email=${user.email}&role=${currentUser.role}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((res) => setUsers(res.data))
        .catch((e) => {
          if (e.response.status === 403) {
            navigate("/forbidden");
          }
        });
    }
  }, [isPending]);

  if (!isPending && !(Object.keys(currentUser) === 0)) {
    return (
      <div className="bg-crimson text-white">
        {/* {console.log(users[0])} */}
        <h1 className="text-3xl text-white w-full text-center p-5 border-b-[4px] border-white">
          All Users
        </h1>
        <div className="overflow-x-auto py-5 flex justify-center">
          <table className="table userTable max-w-[1024px] border-x-[1px]">
            {/* head */}
            <thead>
              <tr className="border-t-[1px] text-white">
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="p-1">
              {/* rows */}
              {users.map((rowData) => (
                <UserRow key={rowData._id} rowId={rowData._id}></UserRow>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr></tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
};

AllUsers.propTypes = {};

export default AllUsers;