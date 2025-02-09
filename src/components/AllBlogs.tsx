import axios, { AxiosResponse } from "axios";
import { IBlogResponse } from "blog-common-1.0";
import { useState } from "react";
import { Link } from "react-router";
import { getJwt } from "../helpers/helper";
import BlogList from "./BlogList";

export default function AllBlogs() {
  const [blogArray, setBlogArray] = useState<IBlogResponse[]>([]);
  const getAllBlogs = async () => {
    try {
      const allBlogs: AxiosResponse<IBlogResponse[]> = await axios.get(
        `http://localhost:3000/api/blog/`,
        {
          headers: {
            Authorization: `Bearer ${getJwt()}`,
          },
        }
      );

      // console.log("this is a ", allBlogs.data[0].blog);

      // console.log("this are all the blogs", allBlogs);

      let blogs: IBlogResponse[] = [];
      allBlogs.data.map((blog) => blogs.push(blog));

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
      <button onClick={getAllBlogs}>Get All Blogs</button>
      <br />
      <br />
      <button>
        <Link to="/api">Go To HomePage</Link>
      </button>
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
