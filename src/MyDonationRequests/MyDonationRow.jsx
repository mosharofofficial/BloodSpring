import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { myAxiosSecure } from "../Axios.config";
import { BsThreeDots } from "react-icons/bs";
import Swal from "sweetalert2";

const MyDonationRow = ({
  reqData,
  refetch,
  currentUser,
  //  updateStatus
}) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        myAxiosSecure
          .delete(`/deleteRequest/${reqData._id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
          .then((res) => {
            if (res.data.deletedCount === 1) {
              Swal.fire({
                title: "Deleted!",
                text: "Request has been deleted.",
                icon: "success",
              });
            }
          })
          .then(() => {
            refetch();
          })
          .catch((e) => console.log(e.message));
      }
    });
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
          Swal.fire("Request modified successfully .");
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
        {reqData.status === "pending" || reqData.status === "canceled" ? (
          "none"
        ) : (
          <ul>
            <li>{reqData.donorName}</li>
            <li>{reqData.donorEmail}</li>
          </ul>
        )}
      </td>
      <td
        className={`flex flex-col p-0 ${
          currentUser.role === "volunteer" && "hidden"
        }`}
      ></td>
      <td className={`flex flex-col p-0 `}>
        <div className="dropdown dropdown-left dropdown-start">
          <div tabIndex={0} role="button" className="btn button px-2 m-0">
            <span className="text-3xl">
              <BsThreeDots />
            </span>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content gap-1 menu bg-white rounded-box z-[1] w-[150px] p-1 shadow border-[1px]"
          >
            <li className={`${currentUser.role === "donor" && "hidden"}`}>
              <button
                onClick={() => updateStatus("in progress", reqData._id)}
                className="btn button px-0 min-h-[0px] h-[30px]"
              >
                In Progress
              </button>
            </li>
            <li className={`${currentUser.role === "donor" && "hidden"}`}>
              <button
                onClick={() => updateStatus("pending", reqData._id)}
                className="btn button px-0 min-h-[0px] h-[30px]"
              >
                Pending
              </button>
            </li>
            <li
              className={`${
                reqData.status !== "in progress" &&
                currentUser.role === "donor" &&
                "hidden"
              }`}
            >
              <button
                onClick={() => updateStatus("done", reqData._id)}
                className="btn button px-0 min-h-[0px] h-[30px]"
              >
                Done
              </button>
            </li>
            <li
              className={`${
                reqData.status !== "in progress" &&
                currentUser.role === "donor" &&
                "hidden"
              }`}
            >
              <button
                onClick={() => updateStatus("canceled", reqData._id)}
                className="btn button px-0 min-h-[0px] h-[30px]"
              >
                Canceled
              </button>
            </li>

            <li>
              <button
                className="btn button min-h-8  h-auto"
                onClick={() =>
                  navigate(`/dashboard/edit-request/${reqData._id}`)
                }
              >
                Edit
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  navigate(`/dashboard/request-details/${reqData._id}`)
                }
                className="btn button min-h-8  h-auto"
              >
                View
              </button>
            </li>
            <li>
              <button
                onClick={handleDelete}
                className="btn button min-h-8  h-auto"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

MyDonationRow.propTypes = {
  reqData: PropTypes.object,
  currentUser: PropTypes.object,
  refetch: PropTypes.func,
  // updateStatus: PropTypes.func,
  role: PropTypes.string,
};

export default MyDonationRow;
