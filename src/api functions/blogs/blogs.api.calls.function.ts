import axios, { AxiosResponse } from "axios";
import {
  IBlogCreateDto,
  IBlogEntity,
  IBlogResponse,
  IBlogUpdateDto,
} from "blog-common-1.0";
import React from "react";
import { getJwt } from "../../helpers/helper";
import { IEntityFilterData } from "blog-common-1.0/dist/generi.types";

// 1. This function creates new blog
export const createBlogApiCallFunction = async (
  e: React.FormEvent<HTMLFormElement>,
  formData: IBlogCreateDto
) => {
  e.preventDefault();

  try {
    const response: AxiosResponse<IBlogEntity> = await axios.post(
      "http://localhost:3000/api/blog",
      formData,
      {
        headers: {
          Authorization: `Bearer ${getJwt()}`, // Add token to header
        },
      }
    );
    console.log("this is the response", response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log("this is the response", response)
      console.error(error.response?.data); // Log the backend error response
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

// 2. This function fetches a blog with specific id
export const getBlogByIdApiCallFunction = async (
  e: React.FormEvent<HTMLFormElement>,
  blogId: number
) => {
  e.preventDefault();

  try {
    const response: AxiosResponse<IBlogResponse> = await axios.get(
      `http://localhost:3000/api/blog/${blogId}`,
      {
        headers: {
          Authorization: `Bearer ${getJwt()}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log("this is the response", response)
      console.error(error.response?.data); // Log the backend error response
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

// 3. This function is used to reload the blog data if a like/dislike happens
export const handleSubmitForBlogGetById = async (
  e: React.FormEvent<HTMLFormElement>,
  blogId: number
) => {
  e.preventDefault(); // ✅ Prevent page refresh

  const response = await getBlogByIdApiCallFunction(e, blogId);
  if (response) {
    return response;
  }
};

// 4. This function fetches all blogs
export const getAllBlogsApiCallFunction = async () => {
  try {
    const response: AxiosResponse<IBlogResponse[]> = await axios.get(
      `http://localhost:3000/api/blog/`,
      {
        headers: {
          Authorization: `Bearer ${getJwt()}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("this is the error", error.response?.data);
    }
  }
};

// 5. Update blog by id
export const updateBlogByIdApiCallFunction = async (
  blogId: number,
  formData: IBlogUpdateDto
) => {
  const response: AxiosResponse<IBlogEntity> = await axios.patch(
    `http://localhost:3000/api/blog/${blogId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${getJwt()}`,
      },
    }
  );
  return response?.data;
};

// 6. Delete blog by id
export const deleteBlogByIdApiCallFunction = async (blogId: number) => {
  // else.preventDefault()

  try {
    const response: AxiosResponse<boolean> = await axios.delete(
      `http://localhost:3000/api/blog/${blogId}`,
      {
        headers: {
          Authorization: `Bearer ${getJwt()}`, // Add token to header
        },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    }
    console.log(error);
  }
};

// 7. This function searches blogs
export const searchBlogByFilterApiCallFunction = async (
  filters: IEntityFilterData<IBlogEntity>
) => {
  try {
    const response: AxiosResponse<IBlogResponse[]> = await axios.post(
      "http://localhost:3000/api/blog/search",
      filters,
      {
        headers: {
          Authorization: `Bearer ${getJwt()}`, // Add token to header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("this is the error", error);
  }
};
