import axios, { AxiosResponse } from "axios";
import { IBlogEntityArray } from "blog-common-1.0";
import { getJwt } from "../helpers/helper";
import { useState } from "react";
import BlogList from "./BlogList";

export default function AllBlogs() {
  const [blogArray, setBlogArray] = useState<IBlogEntityArray>([]);
  const getAllBlogs = async () => {
    try {
      const allBlogs: AxiosResponse<IBlogEntityArray> = await axios.get(
        `http://localhost:3000/api/blog/`,
        {
          headers: {
            Authorization: `Bearer ${getJwt()}`,
          },
        }
      );
      console.log("this are all the blogs", allBlogs);

      let blogs: IBlogEntityArray = [];
      allBlogs.data.map((blog) => blogs.push(blog));

      setBlogArray(allBlogs.data);

      console.log("this is the blogs array", blogs);

      console.log("this are the all blogs", blogArray);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("this is the error", error.response?.data);
      }
    }
  };

  return (
    <div>
      <button onClick={getAllBlogs}>Get All Blogs</button>
      <ul>
        {blogArray.map((blog) => (
          <BlogList key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  );
}
