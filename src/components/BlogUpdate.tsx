import axios from "axios";
import { IBlogEntity, IBlogUpdateDto } from "blog-common-1.0";
import React, { useState } from "react";
import { updateBlogByIdApiCallFunction } from "../api functions/blogs/blogs.api.calls.function";
import { getJwt } from "../helpers/helper";

export default function BlogUpdate() {
  const [formData, setFormData] = useState<IBlogUpdateDto | null>(null);
  const [updatedBlog, setUpdatedBlog] = useState<IBlogEntity | null>(null);
  const [id, setId] = useState<number>();

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
        ([key, value]) => value !== null && value !== ""
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

      setUpdatedBlog(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <>
      <div>This is the component to update the blog</div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          placeholder="Blog ID"
          value={id || ""}
          onChange={handleIdChange} // Separate handler for ID
        />
        <br />
        <br />
        <br />
        <input
          type="text"
          name="title"
          placeholder="Blog title"
          value={formData?.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <input
          type="text"
          name="content"
          placeholder="Blog content"
          value={formData?.content}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <input
          type="text"
          name="keywords"
          placeholder="Blog keywords"
          value={formData?.keywords}
          onChange={handleChange}
        />
        <br />
        <br />
        <br />
        <button type="submit">Update Blog</button>
      </form>
      {updatedBlog && (
        <div>
          <h3>Updated Blog:</h3>
          <p>Title: {updatedBlog.title}</p>
          <p>Content: {updatedBlog.content}</p>
          <p>Keywords: {updatedBlog.keywords}</p>
        </div>
      )}
    </>
  );
}
