import axios from "axios";
import { IBlogResponse } from "blog-common-1.0";
import { useState } from "react";
import { Link } from "react-router";
import { getAllBlogsApiCallFunction } from "../api functions/blogs/blogs.api.calls.function";
import {
  ColorButton,
  GetAllButton,
} from "../styling functions/button.style.function";
import BlogList from "./BlogList";

export default function AllBlogs() {
  const [blogArray, setBlogArray] = useState<IBlogResponse[]>([]);
  const getAllBlogs = async () => {
    try {
      const allBlogs: IBlogResponse[] | undefined =
        await getAllBlogsApiCallFunction();

      let blogs: IBlogResponse[] = [];
      if (allBlogs) {
        allBlogs.map((blog) => blogs.push(blog));
      }

      // console.log("this is the blogs array", blogs);

      setBlogArray(blogs);

      // console.log("this are the all blogs", blogArray);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("this is the error", error.response?.data);
      }
    }
  };

  return (
    <div>
      <GetAllButton onClick={getAllBlogs}>Get All Blogs</GetAllButton>
      <br />
      <br />
      <ColorButton>
        <Link style={{ textDecoration: "none", color: "white" }} to="/api">
          Go To HomePage
        </Link>
      </ColorButton>
      <ul>
        {blogArray.map((blog) => (
          <BlogList
            key={blog.blog.id}
            blog={blog.blog}
            likes={blog.likes}
            comments={blog.comments}
          />
        ))}
      </ul>
    </div>
  );
}
