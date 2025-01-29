import axios, { AxiosResponse } from "axios"
import {
  IBlogEntity,
  IBlogLikeDto,
  IBlogLikesCounterEntity,
  IBlogResponse,
  ICommentCreateDto,
  ICommentEntity,
  LikeStatus
} from "blog-common-1.0"
import React, { useState } from "react"
import { getJwt } from "../helpers/helper"

export default function Comment() {
  const [formData, setFormData] = useState<ICommentCreateDto>({
    blogId: 0,
    text: ""
  })
  const [newComment, setNewComment] = useState<ICommentEntity | null>(null)
  const [blog, setBlog] = useState<IBlogEntity | null>(null)
  const [likeDislikeEntityForm, setLikeDislikeEntityForm] = useState<IBlogLikeDto | null>({
    blogId: 0,
    likedStatus: LikeStatus.NEUTRAL
  })
  React.useEffect(() => {
    getJwt()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: name === "blogId" ? Number(value) || 0 : value, // Ensure `blogId` is always a number
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("this is the comment", formData)

    const token: string | null = getJwt()

    try {
      const responseComment: AxiosResponse<ICommentEntity> = await axios.post(
        'http://localhost:3000/api/comments', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )

      const responseBlog: AxiosResponse<IBlogResponse> =
        await axios.get(
          `http://localhost:3000/api/blog/${formData.blogId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        )
      console.log("this is the blog on which comment is done", responseBlog)

      setBlog(responseBlog.data.blog)
      setNewComment(responseBlog.data.comments[0])
      console.log("this is the response comment", responseComment)
    } catch (error) {
      console.log("this is the error", error)
    }
  }

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("inside handle like function")
    const token: string | null = getJwt()

    // Define the updated like object manually
    const updatedLikeDislikeEntity = {
      blogId: formData.blogId,
      likedStatus: LikeStatus.LIKED,
    };

    try {
      const responseLikeDisLike: AxiosResponse<IBlogLikesCounterEntity> =
        await axios.post(
          `http://localhost:3000/api/likes-counter-blogs`, updatedLikeDislikeEntity, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
        )
      console.log("this is the repsone", responseLikeDisLike)
      setLikeDislikeEntityForm(responseLikeDisLike.data); 
    }catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data); // Log server error message
      } else {
        console.error("Unexpected error:", error);
      }
    }
    
  }

  return <>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Blog Id"
        name="blogId"
        value={formData?.blogId}
        onChange={handleChange}
      />
      <br /><br /><br />
      <input
        type="text"
        placeholder="Comment text"
        name="text"
        value={formData?.text}
        onChange={handleChange}
      />
      <br /><br /><br />
      <button type="submit">Create</button>
    </form>
    {newComment && (
      <div>
        {blog && (
          <div>
            Blog Title: {blog.title};
            <br />
            <br />
            <br />
            Blog Content: {blog.content}
            <br />
            <br />
            <br />
            Blog Author: {blog.author}
          </div>
        )}
        <div>

        </div>
        <h4>This is the new Comment: {newComment.text}</h4>

        {/* <button>Like</button> */}
      </div>
    )}
    <br /><br />
    <button onClick={handleLike}>Like</button>
  </>
}