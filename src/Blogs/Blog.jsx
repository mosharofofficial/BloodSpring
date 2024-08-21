import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import { authContext } from "../Authentication/AuthProvider";
import useGetUser from "../Shared/CustomHooks/useGetUser";
import HTMLReactParser from "html-react-parser/lib/index";
import "./blog.css";
import useAxiosSecure from "../Shared/CustomHooks/useAxiosSecure";

const Blog = () => {
  const myAxiosSecure = useAxiosSecure();
  const { user } = useContext(authContext);
  const { blogId } = useParams();

  const [blog, setBlog] = useState();

  useEffect(() => {
    if (user) {
      // console.log(user.email)
      myAxiosSecure
        .get(`/getBlog/${blogId}?email=${user.email}`)
        .then((res) => setBlog(res.data))
        .catch((e) => console.log(e.message));
    }
  }, [user]);

  if (blog) {
    return (
      <div className="w-[90vw] max-w-[900px] mx-auto bg-crimson text-white p-4 mb-5 blogDetail">
        {/* {console.log(HTMLReactParser(blog.content))} */}
        <h1 className="text-3xl font-semibold">{blog.title}</h1>
        <img src={blog.thumbnail} />
        <>{HTMLReactParser(blog.content)}</>
      </div>
    );
  }
};

Blog.propTypes = {
  blog: PropTypes.object,
};

export default Blog;
