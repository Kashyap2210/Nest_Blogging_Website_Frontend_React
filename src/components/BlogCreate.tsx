import { IBlogCreateDto } from "blog-common-1.0";
import React, { useState } from "react";
import { Link } from "react-router";
import { createBlogApiCallFunction } from "../api functions/blogs/blogs.api.calls.function";
import { getJwt } from "../helpers/helper";
import { ColorButton } from "../styling functions/button.style.function";

export default function BlogCreate() {
  const [formData, setFormData] = useState<IBlogCreateDto>({
    title: "",
    content: "",
    keywords: "",
  });
  const [newBlog, setNewBlog] = useState<IBlogCreateDto | null>(null);

  React.useEffect(() => {
    //function to retrieve JWT and send it along with req
    getJwt();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const newBlog = await createBlogApiCallFunction(e, formData);
    if (newBlog) setNewBlog(newBlog);
  };

  return (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="title"
          placeholder="Enter title of blog"
          name="title"
          value={formData.title}
          onChange={handleChange}
        ></input>
        <br />
        <br />
        <br />
        <input
          type="text"
          placeholder="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
        ></input>
        <br />
        <br />
        <br />
        <input
          type="text"
          placeholder="keywords"
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
        ></input>
        <br />
        <br />
        <br />
        <ColorButton type="submit">Create Blog</ColorButton>
      </form>
      <br />
      <br />

      {/* <ColorButton onClick={routeToUpdateBlog}>
        <link to={"/api/updateBlog"}>Update Blog</link>
      </ColorButton> */}
      <ColorButton>
        <Link style={{ textDecoration: "none", color: "white" }} to="/api">
          Go To HomePage
        </Link>
      </ColorButton>

      {newBlog && (
        <div>
          <h2>This is the title of Blog: {newBlog.title}</h2>
        </div>
      )}
    </>
  );
}
