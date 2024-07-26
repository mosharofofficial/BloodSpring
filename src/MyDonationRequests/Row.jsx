import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { myAxiosSecure } from "../Axios.config";
import { BsThreeDots } from "react-icons/bs";

const Row = ({
  reqData,
  refetch,
  role,
  currentUser,
  //  updateStatus
}) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    myAxiosSecure
      .delete(`/deleteRequest/${reqData._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        if (res.data.deletedCount === 1) {
          alert("Request deleted successfully .");
        }
      })
      .then(() => {
        refetch();
      })
      .catch((e) => console.log(e.message));
  };

  const updateStatus = (newStatus) => {
    myAxiosSecure
      .patch(
        `/updateReqStatus?email=${currentUser.email}&role=${currentUser.role}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
          status: newStatus,
          id: reqData._id,
        }
      )
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          alert("Request modified successfully .");
        }
      })
      .then(() => {
        refetch();
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <tr className="">
      <td className="text-sm">{reqData.recipientName}</td>
      <td className="text-sm">
        {reqData.district}, {reqData.upazila}
      </td>
      <td className="text-sm">{reqData.date}</td>
      <td className="text-sm">{reqData.time}</td>
      <td className="text-sm">{reqData.status}</td>
      <td className="text-sm">
        <ul>
          <li>{reqData.name}</li>
          <li>{reqData.email}</li>
        </ul>
      </td>
      <td className={`flex flex-col p-0 ${role === "volunteer" && "hidden"}`}>
        <button
          onClick={() => navigate(`/dashboard/request-details/${reqData._id}`)}
          className="btn button min-h-8  h-auto"
        >
          View
        </button>
        <button
          className="btn button min-h-8  h-auto"
          onClick={() => navigate(`/dashboard/edit-request/${reqData._id}`)}
        >
          Edit
        </button>
        <button onClick={handleDelete} className="btn button min-h-8  h-auto">
          Delete
        </button>
      </td>
      <td className={`flex flex-col p-0 ${role !== "volunteer" && "hidden"}`}>
        <div className="dropdown dropdown-left dropdown-end">
          <div tabIndex={0} role="button" className="btn button px-2 m-0">
            <span className="">
              {/* <BsThreeDots /> */}
              Status
            </span>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content gap-1 menu bg-white rounded-box z-[1] w-[150px] p-1 shadow border-[1px]"
          >
            <li>
              <button
                onClick={() => updateStatus("pending", reqData._id)}
                className="btn button px-0 min-h-[0px] h-[30px]"
              >
                Pending
              </button>
            </li>
            <li>
              <button
                onClick={() => updateStatus("in progress", reqData._id)}
                className="btn button px-0 min-h-[0px] h-[30px]"
              >
                In Progress
              </button>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

Row.propTypes = {
  reqData: PropTypes.object,
  currentUser: PropTypes.object,
  refetch: PropTypes.func,
  // updateStatus: PropTypes.func,
  role: PropTypes.string,
};

export default Row;
