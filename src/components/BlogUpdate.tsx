import { IBlogEntity, IBlogUpdateDto } from 'blog-common-1.0';
import React, { useState } from 'react';
import { getJwt } from '../helpers/helper';
import axios, { AxiosResponse } from 'axios';

export default function BlogUpdate() {
  const [formData, setFormData] = useState<IBlogUpdateDto | null>(
    null
  );
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

    const token = getJwt(); // Fetch the token
    
    //Filters out empty fields from the form data. In this way we can add more keys to blogs in coming days
    const cleanedFormData = Object.fromEntries(
      Object.entries(formData || {}).filter(([key, value]) => value !== null && value !== '')
    );
    
    if (!id) {
      alert('Please Provide Valid Id');
      return;
    }

    try {
      const response: AxiosResponse<IBlogEntity> = await axios.patch(
        `http://localhost:3000/api/blog/${id}`,
        cleanedFormData, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to header
        }
      }
      );

      // console.log('this is the response from backend', response);
      console.log('this is the updated blog', response.data);

      setUpdatedBlog(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error('Unexpected error:', error);
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
          value={id || ''}
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
