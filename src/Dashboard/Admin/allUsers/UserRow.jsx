import { useContext } from "react";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { myAxiosSecure } from "../../../Axios.config";
import { authContext } from "../../../Authentication/AuthProvider";

const UserRow = ({ rowId }) => {
  const { user } = useContext(authContext);

  const { data: rowData = {}, isPending } = useQuery({
    queryKey: [`${rowId}`],
    queryFn: () => myAxiosSecure.get(`/getUser/${rowId}?email=${user.email}`),
  });

  if (!isPending) {
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
                <button className="btn button px-0 min-h-[0px] h-[30px]">
                  {rowData.data.isActive ? "Block" : "Unblock"}
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
  }
};

UserRow.propTypes = {
  rowId: PropTypes.string,
};

export default UserRow;
