import React from "react";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";

const UserRow = ({ rowData }) => {
  return (
    <tr>
      <td className="px-3">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={rowData.avatar} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{rowData.name}</div>
            <div className="text-sm opacity-90">{rowData.role}</div>
          </div>
        </div>
      </td>
      <td className="px-3">{rowData.email}</td>
      <td className="px-3">{rowData.isActive ? "Active" : "Blocked"}</td>
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
              <button className="btn button px-0 min-h-[0px] h-[30px]">
                {rowData.isActive ? "Block" : "Unblock"}
              </button>
            </li>
            <li>
              <button className="btn button px-0 min-h-[0px] h-[30px]">
                Volunteer
              </button>
            </li>
            <li>
              <button className="btn button px-0 min-h-[0px] h-[30px]">
                Admin
              </button>
            </li>
          </ul>
        </div>
      </th>
    </tr>
  );
};

UserRow.propTypes = {
  rowData: PropTypes.object,
};

export default UserRow;
