import React from "react";
import PropTypes from "prop-types";
import DonorRow from "./DonorRow";
import { FaDropletSlash } from "react-icons/fa6";

const Table = ({ rows }) => {
  return (
    <div className="overflow-x-auto max-w-[1280px] w-[90vw] mx-auto bg-crimson ">
        {rows.length ?
         (
      <table className="table text-white border-[4px] ">
        {/* head */}
        <thead className="text-white ">
          <tr className="text-center">
            <th>Name</th>
            <th>Email</th>
            <th>Blood Group</th>
          </tr>
        </thead>
          <tbody className="">
            {
              rows.map((rowData) => (
                <DonorRow key={rowData._id} rowData={rowData}></DonorRow>
              ))

              // console.log(rows)
            }
          </tbody>
      </table>
        )
         : (
          <div className="flex flex-nowrap items-center gap-3 p-2 text-white text-2xl justify-center">
            No Donor Found <FaDropletSlash />
          </div>
        )}
    </div>
  );
};

Table.propTypes = {
  rows: PropTypes.array,
};

export default Table;
