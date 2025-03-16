import { Input } from "@heroui/react";
import { TextField } from "@mui/material";
import { IBlogCreateDto } from "blog-common-1.0";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { createBlogApiCallFunction } from "../api functions/blogs/blogs.api.calls.function";
import { setBlogs } from "../redux/blogSlice";
import { RootState } from "../redux/store";
import { Button } from "./ui/button";

export default function BlogCreate() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<IBlogCreateDto>({
    title: "",
    content: "",
    keywords: "",
  });
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
    <div className="p-4 min-h-screen text-left ">
      <div className="">
        <form
          onSubmit={handleSubmit}
          className=" px-4 pt-4 mb-8 flex flex-col gap-6 items-start justify-center"
        >
          <Input
            type="title"
            placeholder="Enter title of blog"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-wine rounded-md h-12"
          ></Input>
          <TextField
            id="filled-multiline-static"
            multiline
            name="content"
            rows={20}
            placeholder="What's on ya mind?"
            variant="filled"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            sx={{
              backgroundColor: "white", // Ensures white background
              "& .MuiFilledInput-root": {
                backgroundColor: "white", // Overrides default grey
                border: "1px solid #722f37", // Custom border
                borderRadius: "0.375rem", // Makes it look cleaner
                boxShadow: "none", // Removes any unwanted shadow
                padding: "1rem",
              },
              "& .Mui-focused": {
                backgroundColor: "white !important",
                border: "2px solid #722f37",
              },
              "& .MuiInputBase-root:hover": {
                backgroundColor: "white",
              },
              "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
                {
                  borderBottom: "none !important", // Removes the bottom border
                },
            }}
          />

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
