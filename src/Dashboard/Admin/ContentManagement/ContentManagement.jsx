import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ContentManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-crimson  text-white pb-5">
      <div className=" border-b-[4px] border-white mb-5 py-5 px-5 flex justify-between">
        <h1 className="text-4xl font-bold  ">Content Management</h1>
        <button
          onClick={() => navigate("/dashboard/content-management/add-blog")}
          className="btn button text-3xl h-auto px-2 py-2"
        >
          Add Blog
        </button>
      </div>
      Blogs :
    </div>
  );
};

ContentManagement.propTypes = {};

export default ContentManagement;
