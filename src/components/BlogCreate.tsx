import { Input } from "@heroui/react";
import { IBlogCreateDto } from "blog-common-1.0";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { createBlogApiCallFunction } from "../api functions/blogs/blogs.api.calls.function";
import { setBlogs } from "../redux/blogSlice";
import { RootState } from "../redux/store";
import { Button } from "./ui/button";
import { Textarea } from "@heroui/input";

export default function BlogCreate() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<IBlogCreateDto>({
    title: "",
    content: "",
    keywords: "",
  });
  // const [newBlog, _setNewBlog] = useState<IBlogCreateDto | null>(null);
  const [createdBlog] = useSelector((state: RootState) => state.blogs.blogs);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log;
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
    // <div className="flex flex-col items-center justify-center min-h-screen text-left ">
    <div className="p-4 min-h-screen text-left ">
      {/* <h2 className="text-4xl font-bold text-red-500 mb-4">Create New Blog</h2> */}
      <div className="">
        <form
          onSubmit={handleSubmit}
          className=" px-4 pt-4 mb-8 flex flex-col gap-6 items-start justify-center"
        >
          {/* <input
            type="title"
            placeholder="Enter title of blog"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border px-4"
          ></input> */}
          <Input
            type="title"
            placeholder="Enter title of blog"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-wine rounded-md h-12"
          ></Input>
          <Textarea
            // isMultiline
            type="text"
            name="content"
            description="content"
            minRows={2}
            maxRows={300}
            placeholder="What on ya mind?"
            value={formData.content}
            onChange={handleChange}
            className="border border-wine rounded-md p-4 h-80 overflow-y-auto"
          ></Textarea>
          {/* <input
            type="text"
            placeholder="keywords"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            className="border px-4"
          ></input> */}
          <Input
            type="text"
            placeholder="Help people find your blog more easily by KEYWORDS?"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            className="border border-wine rounded-md h-12"
          ></Input>
          <Button type="submit" className="customButton w-40">
            Create Blog
          </Button>
          <Button className="customButton w-40 block text-center">
            <Link to="/api" className="">
              Go To HomePage
            </Link>
          </Button>
        </form>

        {createdBlog && (
          <div>
            <h2>This is the title of Blog: {createdBlog.title}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
