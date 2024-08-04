import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Blog from "./Blog";
import BlogCard from "./BlogCard";
import { myAxios } from "../Axios.config";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    myAxios
      .get("/getBlogs")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold py-5  mb-5 text-center bg-crimson text-white">
        Blogs
      </h1>
      <div >
        
        {blogs.map((blog) => {
          return <BlogCard key={blog._id} blog={blog}></BlogCard>;
        })}
      </div>
    </div>
  );
};

Blogs.propTypes = {};

export default Blogs;
