import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { myAxiosSecure } from "../../../Axios.config";
import { authContext } from "../../../Authentication/AuthProvider";
import ErrorPage from "../../../Shared/ErrorPage";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserRow = ({ rowId }) => {
  const { user } = useContext(authContext);

  const {
    data: rowData = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: [`${rowId}`],
    queryFn: () => myAxiosSecure.get(`/getUser/${rowId}?email=${user.email}`),
  });

  //   useEffect(()=>{
  //     console.log(Object.keys(rowData));
  //   }, [isPending])

  const makeAdmin = () => {
    myAxiosSecure
      .patch(`/makeAdmin/${rowId}?email=${user.email}`)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          Swal.fire(rowData.data.name + " is now an admin.");
        }
      })
      .then(() => {
        refetch();
      })
      .catch((e) => console.log(e.message));
  };

  const makeVolunteer = () => {
    myAxiosSecure
      .patch(`/makeVolunteer/${rowId}?email=${user.email}`)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          Swal.fire(rowData.data.name + ` is now a volunteer.`);
        }
      })
      .then(() => {
        refetch();
      })
      .catch((e) => console.log(e.message));
  };

  const blockUser = () => {
    myAxiosSecure
      .patch(`/blockUser/${rowId}?email=${user.email}`)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
         Swal.fire(rowData.data.name + ` is now blocked.`);
        }
      })
      .then(() => {
        refetch();
      })
      .catch((e) => console.log(e.message));
  };

  const unblockUser = () => {
    myAxiosSecure
      .patch(`/unblockUser/${rowId}?email=${user.email}`)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          Swal.fire(rowData.data.name + ` is now active.`);
        }
      })
      .then(() => {
        refetch();
      })
      .catch((e) => console.log(e.message));
  };

  if (!isPending && Object.keys(rowData)) {
    return (
      <tr className="">
        <td className="p-1">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={rowData.data.avatar}
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{rowData.data.name}</div>
              <div className="text-sm opacity-90">{rowData.data.role}</div>
            </div>
          </div>
        </td>
        <td className="px-1">{rowData.data.email}</td>
        <td className="px-1">{rowData.data.isActive ? "Active" : "Blocked"}</td>
        <th>
          <div className="dropdown dropdown-left dropdown-end">
            <div tabIndex={0} role="button" className="btn button px-2 m-0">
              <span className="text-3xl">
                <BsThreeDots />
              </span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content gap-1 menu bg-white rounded-box z-[1] w-[150px] p-1 shadow border-[1px]"
            >
              <li>
                <button
                  onClick={rowData.data.isActive ? blockUser : unblockUser}
                  className="btn button px-0 min-h-[0px] h-[30px]"
                >
                  {rowData.data.isActive ? "Block" : "Unblock"}
                </button>
              </li>
              <li>
                <button
                  onClick={makeVolunteer}
                  className="btn button px-0 min-h-[0px] h-[30px]"
                >
                  Volunteer
                </button>
              </li>
              <li>
                <button
                  onClick={makeAdmin}
                  className="btn button px-0 min-h-[0px] h-[30px]"
                >
                  Admin
                </button>
              </li>
            </ul>
          </div>
        </th>
      </tr>
    );
  }
};

UserRow.propTypes = {
  rowId: PropTypes.string,
};

export default UserRow;
