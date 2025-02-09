import axios, { AxiosResponse } from "axios";
import {
  IBlogEntity,
  IBlogLikesCounterEntity,
  ICommentEntity,
  LikeStatus,
} from "blog-common-1.0";
import React, { useState } from "react";
import { Link } from "react-router";
import { getBlogByIdApiCallFunction } from "../api functions/blogs.api.calls.function";
import { getJwt } from "../helpers/helper";

export default function BlogById() {
  const [formData, setFormData] = useState({
    blogId: 0,
  });
  const [blog, setBlog] = useState<IBlogEntity | null>(null);
  const [comment, setComments] = useState<ICommentEntity[]>();
  const [likesAndDislikeEntities, setLikesAndDislikeEntities] =
    useState<IBlogLikesCounterEntity[]>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: name === "blogId" ? Number(value) || 0 : value,
    }));
  };

  const handleSubmitForBlogById = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault(); // ✅ Prevent page refresh

    // if (!formData.blogId) {
    //   console.error("❌ Error: Blog ID is missing.");
    //   return;
    // }

    await getBlogByIdApiCallFunction(
      e,
      formData.blogId,
      setBlog,
      setComments,
      setLikesAndDislikeEntities
    );
  };

  const totalLikes = likesAndDislikeEntities?.filter(
    (entity) => entity.likedStatus === LikeStatus.LIKED
  );
  const totalDisLikes = likesAndDislikeEntities?.filter(
    (entity) => entity.likedStatus === LikeStatus.DISLIKED
  );

  const likeBlog = async () => {
    // e.preventDefault();
    console.log("inside the like function");
    try {
      const likeResponse: AxiosResponse<IBlogLikesCounterEntity> =
        await axios.post(
          `http://localhost:3000/api/likes-counter-blogs/`,
          {
            blogId: blog?.id,
            likedStatus: LikeStatus.LIKED,
          },
          {
            headers: {
              Authorization: `Bearer ${getJwt()}`,
            },
          }
        );
      setLikesAndDislikeEntities((prevLikes) => [
        ...(prevLikes || []),
        likeResponse.data,
      ]);
      handleSubmitForBlogById({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
      //   console.log("this is the like response", likeResponse);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.log("this is hte error", error);
      }
    }
  };
  const dislikeBlog = async () => {
    // e.preventDefault()
    console.log("inside the like function");
    try {
      const likeResponse: AxiosResponse<IBlogLikesCounterEntity> =
        await axios.post(
          `http://localhost:3000/api/likes-counter-blogs/`,
          {
            blogId: blog?.id,
            likedStatus: LikeStatus.DISLIKED,
          },
          {
            headers: {
              Authorization: `Bearer ${getJwt()}`,
            },
          }
        );
      setLikesAndDislikeEntities((prevLikes) => [
        ...(prevLikes || []),
        likeResponse.data,
      ]);
      handleSubmitForBlogById({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
      //   console.log("this is the like response", likeResponse);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.log("this is hte error", error);
      }
    }
  };

  const changeStatusToNeutral = async () => {
    console.log("inside the double click function");
    try {
      const response: AxiosResponse<void> = await axios.post(
        `http://localhost:3000/api/likes-counter-blogs/${blog?.id}`,
        {
          headers: {
            Authorization: `Bearer ${getJwt()}`,
          },
        }
      );
      console.log("this is the response from double click function", response);

      handleSubmitForBlogById({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={handleSubmitForBlogById}>
        <input
          type="text"
          placeholder="Blog Id"
          name="blogId"
          value={formData?.blogId}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Get Blog</button>
      </form>
      <br />
      <br />
      <br />
      <br />
      <button>
        <Link to="/api">Go To HomePage</Link>
      </button>
      <br />
      <br />
      <br />
      <br />
      <hr />
      {blog && (
        <div>
          <h1>{blog.title}</h1>
          <h3>{blog.keywords}</h3>
          <h4>{blog.content}</h4>
          <h5>{blog.author}</h5>
          {/* <h6>{blog.createdBy}</h6> */}
        </div>
      )}
      <br />
      <br />
      <hr />
      <h2>Comments</h2>
      {comment &&
        comment.map((mapping) => (
          <div key={mapping.id}>
            <h3>{mapping.text}</h3>
            <h4>{mapping.authorId}</h4>
          </div>
        ))}
      <br />
      <br />
      <hr />
      {likesAndDislikeEntities && (
        <div>
          <h4>Total Likes: {totalLikes?.length}</h4>
          <h4>Total DisLikes: {totalDisLikes?.length}</h4>
        </div>
      )}

      <button onClick={likeBlog} onDoubleClick={changeStatusToNeutral}>
        Like
      </button>
      <br />
      <br />
      <button onClick={dislikeBlog} onDoubleClick={changeStatusToNeutral}>
        Dislike
      </button>
    </>
  );
}
