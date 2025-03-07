import axios from "axios";
import { IBlogEntity, IBlogUpdateDto } from "blog-common-1.0";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { updateBlogByIdApiCallFunction } from "../api functions/blogs/blogs.api.calls.function";
import { getJwt } from "../helpers/helper";
import { updateBlog } from "../redux/blogSlice";
import { RootState } from "../redux/store";
import { ColorButton } from "../styling functions/button.style.function";

export default function BlogUpdate() {
  const [formData, setFormData] = useState<IBlogUpdateDto | null>(null);
  const [updatedBlog] = useSelector((state: RootState) => state.blogs.blogs);
  const [id, setId] = useState<number>();

  const dispatch = useDispatch();
  React.useEffect(() => {
    getJwt();
  }, []);

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
      alert("Please Provide Valid Id");
      return;
    }

    try {
      const response: IBlogEntity = await updateBlogByIdApiCallFunction(
        id,
        cleanedFormData
      );

      dispatch(updateBlog(response));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-left">
      <h2 className="text-4xl font-bold text-red-500 mb-4">
        Update specific blog with Id
      </h2>
      <div>
        <form
          onSubmit={handleSubmit}
          className="border p-8 flex flex-col gap-8 mb-8"
        >
          <input
            type="number"
            name="id"
            placeholder="Blog ID"
            value={id || ""}
            onChange={handleIdChange} // Separate handler for ID
            className="border px-4"
          />
          <input
            type="text"
            name="title"
            placeholder="Blog title"
            value={formData?.title}
            onChange={handleChange}
            className="border px-4"
          />
          <input
            type="text"
            name="content"
            placeholder="Blog content"
            value={formData?.content}
            onChange={handleChange}
            className="border px-4"
          />
          <input
            type="text"
            name="keywords"
            placeholder="Blog keywords"
            value={formData?.keywords}
            onChange={handleChange}
            className="border px-4"
          />
          <ColorButton type="submit">Update Blog</ColorButton>
        </form>
        <ColorButton className="w-full block text-center">
          <Link style={{ textDecoration: "none", color: "white" }} to="/api">
            Go To HomePage
          </Link>
        </ColorButton>
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
