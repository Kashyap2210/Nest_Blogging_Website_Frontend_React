import { IBlogCreateDto } from "blog-common-1.0";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createBlogApiCallFunctionU } from "../api functions/blogs.api.calls.function";
import { getJwt } from "../helpers/helper";

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
    await createBlogApiCallFunctionU(e, formData, setNewBlog);

    // e.preventDefault();
    // console.log('this is the blog data', formData);

    // const token: string | null = getJwt();

    // try {
    //   const response: AxiosResponse<IBlogEntity> = await axios.post(
    //     'http://localhost:3000/api/blog',
    //     formData, {
    //     headers: {
    //       Authorization: `Bearer ${token}`, // Add token to header
    //     }
    //   }
    //   );
    //   console.log('this is the response', response);
    //   const { data } = response;
    //   console.log('this is the new blog', data);
    //   setNewBlog(data);
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     // console.log("this is the response", response)
    //     console.error(error.response?.data); // Log the backend error response
    //   } else {
    //     console.error('Unexpected error:', error);
    //   }
    // }
  };

  const routeToUpdateBlog = () => {
    console.log("click event for routing to update blog page");
    const navigate = useNavigate();
    navigate("/api/updateBlog");
  };

  return (
    <>
      <div>this is the container to create blogs</div>
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
        <button type="submit">Create Blog</button>
      </form>

      <button onClick={routeToUpdateBlog}>
        {/* <Link to={"/api/updateBlog"}> */}
        Update Blog
        {/* </Link> */}
      </button>

      {newBlog && (
        <div>
          <h2>This is the title of Blog: {newBlog.title}</h2>
        </div>
      )}
    </>
  );
}
