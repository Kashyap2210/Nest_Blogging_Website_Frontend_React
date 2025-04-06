import { Input } from "@heroui/react";
import { TextField } from "@mui/material";
import axios from "axios";
import { IBlogEntity, IBlogResponse, IBlogUpdateDto } from "blog-common-1.0";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  getBlogByIdApiCallFunction,
  updateBlogByIdApiCallFunction,
} from "../api functions/blogs/blogs.api.calls.function";
import { getJwt } from "../helpers/helper";
import { updateBlog } from "../redux/blogSlice";
import { setBlogForIndividualBlog } from "../redux/individualBlogSlice";
import { RootState } from "../redux/store";
import { Button } from "./ui/button";

export default function BlogUpdate() {
  const [formData, setFormData] = useState<IBlogUpdateDto | null>(null);
  const [id, setId] = useState<number>();
  const updatedBlog = useSelector((state: RootState) =>
    id !== undefined
      ? state.blogs.blogs.find((blog) => blog.id === id)
      : undefined
  );
  console.log("this is the updatedBlog", updatedBlog);
  const [errors, setErrors] = useState({
    id: false,
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    getJwt();
  }, []);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setId(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Filters out empty fields from the form data. In this way we can add more keys to blogs in coming days
    const cleanedFormData: IBlogUpdateDto = Object.fromEntries(
      Object.entries(formData || {}).filter(
        ([_, value]) => value !== null && value !== ""
      )
    );

    if (!id) {
      setErrors({
        id: true,
      });
      return;
    }

    try {
      const response: IBlogEntity = await updateBlogByIdApiCallFunction(
        id,
        cleanedFormData
      );

      const responseU: IBlogResponse | undefined =
        await getBlogByIdApiCallFunction(e, id);
      console.log("this is the updated blog in IBLogResponse form", responseU);

      dispatch(updateBlog(response));
      if (responseU) dispatch(setBlogForIndividualBlog([responseU]));

      navigate("/api/readIndividualBlog", {
        state: {
          blog: responseU?.blog,
          likes: responseU?.likes,
          comments: responseU?.comments,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen text-left">
    <div className="p-4 min-h-screen text-left">
      {/* <h2 className="text-4xl font-bold text-red-500 mb-4">Update Blog</h2> */}
      <div>
        <form
          onSubmit={handleSubmit}
          className="px-4 pt-4 mb-8 flex flex-col gap-6 items-start justify-center"
        >
          <Input
            type="number"
            name="id"
            placeholder={
              errors.id ? "Id is required to update blog" : "Enter id of blog."
            }
            value={id !== undefined ? id.toString() : ""}
            onChange={handleIdChange} // Separate handler for ID
            className={
              errors.id
                ? "border border-red-700 border-2 rounded-md h-12"
                : "border border-wine rounded-md h-12"
            }
          />
          {/* <input
            type="text"
            name="title"
            placeholder="Blog title"
            value={formData?.title}
            onChange={handleChange}
            className="border px-4"
          /> */}
          <Input
            type="title"
            placeholder={"Enter title of blog"}
            name="title"
            value={formData?.title}
            onChange={handleChange}
            className={"border border-wine rounded-md h-12"}
          ></Input>
          {/* <input
            type="text"
            name="content"
            placeholder="Blog content"
            value={formData?.content}
            onChange={handleChange}
            className="border px-4"
          /> */}
          <TextField
            id="filled-multiline-static"
            multiline
            name="content"
            rows={20}
            placeholder={"What's on ya mind?"}
            variant="filled"
            value={formData?.content}
            onChange={handleChange}
            fullWidth
            sx={{
              backgroundColor: "white", // Ensures white background
              "& .MuiFilledInput-root": {
                backgroundColor: "white", // Overrides default grey
                border: "1px solid #722f37",
                borderRadius: "0.375rem", // Makes it look cleaner
                boxShadow: "none", // Removes any unwanted shadow
                padding: "1rem",
              },
              "& .Mui-focused": {
                backgroundColor: "white !important",
                border: "1px solid #722f37",
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

          {/* <input
            type="text"
            name="keywords"
            placeholder="Blog keywords"
            value={formData?.keywords}
            onChange={handleChange}
            className="border px-4"
          /> */}
          <Input
            type="text"
            placeholder="Help people find your blog more easily by KEYWORDS?"
            name="keywords"
            value={formData?.keywords}
            onChange={handleChange}
            className="border border-wine rounded-md h-12"
          ></Input>
          <Button type="submit" className="customButton w-40">
            Update Blog
          </Button>
          <Button className="customButton w-40 block text-center">
            <Link to="/api">Go To HomePage</Link>
          </Button>
        </form>
      </div>
      {updatedBlog && (
        <div>
          <h3>Updated Blog:</h3>
          <p>Title: {updatedBlog.title}</p>
          <p>Content: {updatedBlog.content}</p>
          <p>Keywords: {updatedBlog.keywords}</p>
        </div>
      )}
    </div>
  );
}
