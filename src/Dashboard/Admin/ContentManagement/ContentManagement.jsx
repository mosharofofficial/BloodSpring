import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { myAxiosSecure } from "../../../Axios.config";
import { authContext } from "../../../Authentication/AuthProvider";
import BlogRow from "./BlogRow";
import { useQuery } from "@tanstack/react-query";

const ContentManagement = () => {
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  // const [rows, setRows] = useState([]);

  const {
    data: rows = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["getAllBlogs"],
    queryFn: () =>
      myAxiosSecure
        .get(`/getBlogs?email=${user.email}`)
        .then((res) => res.data),
  });

  if (!isPending) {
    return (
      <div className="bg-crimson  text-white pb-5">
        <div className=" border-b-[4px] border-white mb-5 py-5 px-5 flex justify-between items-center">
          <h1 className="text-4xl font-bold  ">Content Management</h1>
          <button
            onClick={() => navigate("/dashboard/content-management/add-blog")}
            className="btn button text-3xl h-auto px-2 py-2"
          >
            Add Blog
          </button>
        </div>
        {/* <h1 className="text-2xl font-bold pl-5 mb-5 ">blogs :</h1> */}
        <div className="bg-crimson text-white">
          <div className="overflow-x-auto ">
            <table className="table table-xs text-center mt-5">
              <thead>
                <tr>
                  <th></th>
                </tr>
                <tr className="text-white ">
                  <th>Blog Title</th>
                  <th>BLog Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((rowData) => {
                  return (
                    <BlogRow
                      key={rowData._id}
                      rowData={rowData}
                      refetch={refetch}
                    ></BlogRow>
                  );
                })}
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

ContentManagement.propTypes = {};

export default ContentManagement;
