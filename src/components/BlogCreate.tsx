import { IBlogCreateDto } from "blog-common-1.0";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { createBlogApiCallFunction } from "../api functions/blogs/blogs.api.calls.function";
import { setBlogs } from "../redux/blogSlice";
import { ColorButton } from "../styling functions/button.style.function";
import { RootState } from "../redux/store";

export default function BlogCreate() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<IBlogCreateDto>({
    title: "",
    content: "",
    keywords: "",
  });
  // const [newBlog, _setNewBlog] = useState<IBlogCreateDto | null>(null);
  const [createdBlog] = useSelector((state: RootState) => state.blogs.blogs);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const newBlog = await createBlogApiCallFunction(e, formData);
    if (newBlog) {
      dispatch(setBlogs([newBlog]));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-left ">
      <h2 className="text-4xl font-bold text-red-500 mb-4">Create New Blog</h2>
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="border p-8 mb-8 flex flex-col gap-8 items-center justify-center"
        >
          <input
            type="title"
            placeholder="Enter title of blog"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border px-4"
          ></input>
          <input
            type="text"
            placeholder="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="border px-4"
          ></input>
          <input
            type="text"
            placeholder="keywords"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            className="border px-4"
          ></input>
          <ColorButton type="submit" className="w-full">
            Create Blog
          </ColorButton>
        </form>

        <ColorButton className="w-full block text-center">
          <Link to="/api" className="">
            Go To HomePage
          </Link>
        </ColorButton>

        {createdBlog && (
          <div>
            <h2>This is the title of Blog: {createdBlog.title}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
