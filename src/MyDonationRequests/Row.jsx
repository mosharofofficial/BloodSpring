import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Row = ({ reqData }) => {
  const navigate = useNavigate();

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
        <button className="btn button min-h-8  h-auto">Delete</button>
      </td>
    </tr>
  );
};

Row.propTypes = {
  reqData: PropTypes.object,
};

export default Row;
