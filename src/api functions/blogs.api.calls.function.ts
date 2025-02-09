import axios, { AxiosResponse } from "axios";
import {
  IBlogCreateDto,
  IBlogEntity,
  IBlogLikesCounterEntity,
  IBlogResponse,
  ICommentEntity,
} from "blog-common-1.0";
import { getJwt } from "../helpers/helper";
import React from "react";

export const createBlogApiCallFunction = async (
  e: React.FormEvent<HTMLFormElement>,
  formData: IBlogCreateDto,
  setNewBlog?: (blog: IBlogEntity) => void
) => {
  e.preventDefault();
  //   console.log("this is the blog data", formData);

  const token: string | null = getJwt();

  try {
    const response: AxiosResponse<IBlogEntity> = await axios.post(
      "http://localhost:3000/api/blog",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to header
        },
      }
    );
    console.log("this is the response", response);
    const { data } = response;
    console.log("this is the new blog", data);
    if (setNewBlog) {
      setNewBlog(data);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log("this is the response", response)
      console.error(error.response?.data); // Log the backend error response
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const getBlogByIdApiCallFunction = async (
  e: React.FormEvent<HTMLFormElement>,
  blogId: number,
  setBlog?: (blog: IBlogEntity) => void,
  setComments?: (comments: ICommentEntity[]) => void,
  setLikesAndDislikeEntities?: (
    likesDislikeEntities: IBlogLikesCounterEntity[]
  ) => void
) => {
  e.preventDefault();

  console.log("this is the typeof blogId", typeof blogId);

  try {
    const response: AxiosResponse<IBlogResponse> = await axios.get(
      `http://localhost:3000/api/blog/${blogId}`,
      // `http://localhost:3000/api/blog/$`,
      {
        headers: {
          Authorization: `Bearer ${getJwt()}`,
        },
      }
    );
    //   console.log("this is the response blog", response);
    if (setBlog) {
      setBlog(response.data.blog);
    }

    if (setComments) {
      //   console.log(response.data.comments);
      setComments(response.data.comments);
    }

    if (setLikesAndDislikeEntities) {
      //   console.log(response.data.likes);
      setLikesAndDislikeEntities(response.data.likes);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log("this is the response", response)
      console.error(error.response?.data); // Log the backend error response
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const handleSubmitForBlogGetById = async (
  e: React.FormEvent<HTMLFormElement>,
  blogId: number,
  setBlog?: (blog: IBlogEntity) => void,
  setComments?: (comments: ICommentEntity[]) => void,
  setLikesAndDislikeEntities?: (
    likesDislikeEntities: IBlogLikesCounterEntity[]
  ) => void
) => {
  e.preventDefault(); // ✅ Prevent page refresh

  await getBlogByIdApiCallFunction(
    e,
    blogId,
    setBlog,
    setComments,
    setLikesAndDislikeEntities
  );
};
