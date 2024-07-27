import { useContext,  useState } from "react";
import PropTypes from "prop-types";
import { Navigate, useNavigate } from "react-router-dom";
import { myAxiosSecure } from "../../../Axios.config";
import { authContext } from "../../../Authentication/AuthProvider";
import BlogRow from "./BlogRow";
import { useQuery } from "@tanstack/react-query";
import useGetUser from "../../../Shared/CustomHooks/useGetUser";

const ContentManagement = () => {

    const { data: currentUser = {}, isPending:userPending } = useGetUser();
  
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  const [filter, setFilter] = useState(undefined);
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


  if (currentUser.role === "donor") {
    return <Navigate to={"/forbidden"}></Navigate>;
  }


  if (!isPending && !userPending) {
    return (
      <div className="bg-crimson  text-white pb-5 h-screen">
        <div className=" border-b-[4px] border-white mb-5 py-5 px-5 flex justify-between items-center">
          <h1 className="text-4xl font-bold  ">Content Management</h1>
          <button
            onClick={() => navigate("/dashboard/content-management/add-blog")}
            className="btn button text-3xl h-auto px-2 py-2"
          >
            Add Blog
          </button>
        </div>
        <div className="bg-crimson text-white">
          <div className="overflow-x-auto min-h-[600px]">
            <div className="flex justify-center ">
              <div className="dropdown dropdown-right dropdown-start">
                <div tabIndex={0} role="button" className="btn button px-2 m-0">
                  <span className="text-2xl">Filter</span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content gap-1 menu bg-white rounded-box z-[1] w-[150px] p-1 shadow border-[1px]"
                >
                  <li>
                    <button onClick={()=>setFilter(undefined)} className="btn button px-0 min-h-[0px] h-[30px]">
                      All
                    </button>
                  </li>
                  <li>
                    <button onClick={()=>setFilter('draft')} className="btn button px-0 min-h-[0px] h-[30px]">
                      Draft
                    </button>
                  </li>
                  <li>
                    <button onClick={()=>setFilter('published')} className="btn button px-0 min-h-[0px] h-[30px]">
                      Published
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <table className="table table-xs text-center mt-6">
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
                {!filter
                  ? rows.map((rowData) => {
                      return (
                        <BlogRow
                          key={rowData._id}
                          rowData={rowData}
                          refetch={refetch}
                          currentUser={currentUser}
                        ></BlogRow>
                      );
                    })
                  : rows
                      .filter((row) => row.status === filter)
                      .map((rowData) => {
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
