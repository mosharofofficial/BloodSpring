import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { myAxiosSecure } from "../Axios.config";
import { PiHandCoins } from "react-icons/pi";

const Row = ({ reqData ,refetch}) => {
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
      }).then(()=>{
        refetch()
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
      <td className="flex flex-col p-0 ">
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
    </tr>
  );
};

Row.propTypes = {
  reqData: PropTypes.object,
};

export default Row;
