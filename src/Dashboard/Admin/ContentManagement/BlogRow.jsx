import React, { useContext } from "react";
import PropTypes from "prop-types";
import HTMLReactParser from "html-react-parser/lib/index";
import { BsThreeDots } from "react-icons/bs";
import { myAxiosSecure } from "../../../Axios.config";
import { authContext } from "../../../Authentication/AuthProvider";
import Swal from "sweetalert2";

const BlogRow = ({ rowData, refetch, currentUser }) => {
  const { user } = useContext(authContext);

  const publish = () => {
    myAxiosSecure
      .patch(`/publishBlog/${rowData._id}?email=${user.email}`)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          Swal.fire("Successfully published blog.");
        }
      })
      .then(() => refetch())
      .catch((e) => console.log(e.message));
  };

  const unpublish = () => {
    myAxiosSecure
      .patch(`/unpublishBlog/${rowData._id}?email=${user.email}`)
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          Swal.fire("Successfully unpublished blog.");
        }
      })
      .then(() => refetch())
      .catch((e) => console.log(e.message));
  };

  const deleteBlog = () => {


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
          .delete(`/deleteBlog/${rowData._id}?email=${user.email}`)
          .then((res) => {
            if (res.data.deletedCount === 1) {
               Swal.fire({
                 title: "Deleted!",
                 text: "Blog has been deleted.",
                 icon: "success",
               });
            }
          })
          .then(() => refetch())
          .catch((e) => console.log(e.message));

       
      }
    });
    

    // myAxiosSecure
    //   .delete(`/deleteBlog/${rowData._id}?email=${user.email}`)
    //   .then((res) => {
    //     if (res.data.deletedCount === 1) {
    //       Swal.fire("Successfully deleted blog.");
    //     }
    //   })
    //   .then(() => refetch())
    //   .catch((e) => console.log(e.message));
  };

  return (
    <tr>
      <td className="text-lg">{HTMLReactParser(rowData?.title)}</td>
      <td>{rowData?.status}</td>
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
            {/* admin only */}
            <li className={` ${currentUser.role !== "admin" && "hidden"}`}>
              <button
                onClick={rowData?.status === "draft" ? publish : unpublish}
                className="btn button px-0 min-h-[0px] h-[30px]"
              >
                {rowData?.status === "draft" ? "Publish" : "Unpublish"}
              </button>
            </li>

            {/* volunteer only */}
            <li className={` ${currentUser.role !== "volunteer" && "hidden"}`}>
              <button
                onClick={unpublish}
                className="btn button px-0 min-h-[0px] h-[30px]"
              >
                {"Unpublish"}
              </button>
            </li>
            <li className={`${currentUser.role !== "admin" && " hidden"}`}>
              <button
                onClick={deleteBlog}
                className="btn button px-0 min-h-[0px] h-[30px]"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </th>
    </tr>
  );
};

BlogRow.propTypes = {
  rowData: PropTypes.object,
  currentUser: PropTypes.object,
  refetch: PropTypes.func,
};

export default BlogRow;
