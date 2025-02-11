import {
  IBlogEntity,
  IBlogLikesCounterEntity,
  ICommentCreateDto,
  ICommentEntity,
  LikeStatus,
} from "blog-common-1.0";
import React, { useState } from "react";
import { Link } from "react-router";
import { handleSubmitForBlogGetById } from "../api functions/blogs/blogs.api.calls.function";
import { createCommentApiCallFunction } from "../api functions/comments/comments.api.calls.function";
import {
  changeLikeStatusApiCallFunction,
  createDislikeEntityApiCallFunction,
  createLikeEntityApiCallFunction,
} from "../api functions/likes/dislikes.api.calls.functions";

export default function BlogById() {
  const [formData, setFormData] = useState({
    blogId: 0,
  });
  const [blog, setBlog] = useState<IBlogEntity | null>(null);
  const [comment, setComments] = useState<ICommentEntity[]>([]);
  const [likesAndDislikeEntities, setLikesAndDislikeEntities] = useState<
    IBlogLikesCounterEntity[]
  >([]);

  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [newComment, setNewComment] = useState<ICommentCreateDto>({
    text: "",
    blogId: 0,
  });

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
    const response = await handleSubmitForBlogGetById(e, formData.blogId);

    if (response) {
      setBlog(response.blog);
      setComments(response.comments);
      setLikesAndDislikeEntities(response.likes);
    }
  };

  const totalLikes = likesAndDislikeEntities?.filter(
    (entity) => entity.likedStatus === LikeStatus.LIKED
  );
  const totalDisLikes = likesAndDislikeEntities?.filter(
    (entity) => entity.likedStatus === LikeStatus.DISLIKED
  );

  const likeBlog = async () => {
    try {
      const newLike = await createLikeEntityApiCallFunction(formData.blogId);
      if (newLike) {
        setLikesAndDislikeEntities((previousLikes) => [
          ...previousLikes,
          newLike,
        ]);
      }
    } catch (error) {
      console.error("falied to create like", error);
    }
  };
  const dislikeBlog = async () => {
    console.log("inside the like function");
    try {
      const newDislike = await createDislikeEntityApiCallFunction(
        formData.blogId
      );

      if (newDislike) {
        setLikesAndDislikeEntities((previousDislikes) => [
          ...previousDislikes,
          newDislike,
        ]);
      }
    } catch (error) {
      console.error("falied to create dislike", error);
    }
  };

  const changeStatusToNeutral = async () => {
    console.log("inside the double click function");
    try {
      await changeLikeStatusApiCallFunction(formData.blogId);

      await handleSubmitForBlogById({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
    } catch (error) {}
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const createComment = async () => {
    console.log("inside the create comment function");
    if (!blog?.id) {
      console.error("Blog id is required");
      return;
    }

    try {
      const newCommentData = {
        blogId: blog.id,
        text: newComment?.text,
      };

      const createdComment = await createCommentApiCallFunction(newCommentData);
      if (createdComment) {
        setComments((previousComment) => [...previousComment, createdComment]);
        setNewComment({ blogId: blog.id, text: "" });
        setIsCommentFormVisible(false);
      }
    } catch (error) {
      console.log("this is the error", error);
    }
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
            <h3>Text: {mapping.text}</h3>
            <h4>Written By: {mapping.authorId}</h4>
            <hr />
          </div>
        ))}
      <button onClick={() => setIsCommentFormVisible(!isCommentFormVisible)}>
        {isCommentFormVisible ? "Cancel" : "Add Comment"}
      </button>

      {isCommentFormVisible && (
        <div>
          <input
            type="text"
            name="comment"
            value={newComment.text}
            onChange={(e) =>
              setNewComment({ ...newComment, text: e.target.value })
            }
          />
          <button onClick={createComment}>Create</button>
        </div>
      )}
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
