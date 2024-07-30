import React from "react";
import PropTypes from "prop-types";

const DonorRow = ({rowData}) => {
  return (
    <tr className="text-center">
      <td>
        <div className="flex items-center">
          <div className="font-bold">{rowData.name}</div>
        </div>
      </td>
      <td>{rowData.email}</td>

      <td>{rowData.bloodGroup}</td>
    </tr>
  );
};

DonorRow.propTypes = {
  rowData: PropTypes.object,
};

export default DonorRow;
