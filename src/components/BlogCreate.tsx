import axios, { AxiosResponse } from 'axios';
import { IBlogCreateDto, IBlogEntity } from 'blog-common-1.0';
import React, { useState } from 'react';
import { getJwt } from '../helpers/helper';

export default function BlogCreate() {
  const [formData, setFormData] = useState<IBlogCreateDto>({
    title: '',
    content: '',
    keywords: '',
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
    e.preventDefault();
    console.log('this is the blog data', formData);

    try {
      const response: AxiosResponse<IBlogEntity> = await axios.post(
        'http://localhost:3000/api/blog',
        formData
      );
      console.log('this is the response', response);
      const { data } = response;
      console.log('this is the new blog', data);
      setNewBlog(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // console.log("this is the response", response)
        console.error(error.response?.data); // Log the backend error response
      } else {
        console.error('Unexpected error:', error);
      }
    }
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
      {newBlog && (
        <div>
          <h2>This is the title of Blog: {newBlog.title}</h2>
        </div>
      )}
    </>
  );
}
