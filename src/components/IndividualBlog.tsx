import {
  IBlogLikesCounterEntity,
  ICommentCreateDto,
  ICommentEntity,
  LikeStatus,
} from "blog-common-1.0";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { handleSubmitForBlogGetById } from "../api functions/blogs/blogs.api.calls.function";
import { createCommentApiCallFunction } from "../api functions/comments/comments.api.calls.function";
import {
  changeLikeStatusApiCallFunction,
  createDislikeEntityApiCallFunction,
  createLikeEntityApiCallFunction,
} from "../api functions/likes/dislikes.api.calls.functions";
import { IBlogListProps } from "../interfaces/blog_list_prop.interface";
import {
  ColorButton,
  DislikeButton,
  GetAllButton,
  LikeButton,
} from "../styling functions/button.style.function";
import Comments from "./CommentsU";

export default function IndividualBlog() {
  const [allComments, setAllComment] = useState<ICommentEntity[]>([]);
  const [likesAndDislikeEntities, setLikesAndDislikeEntities] = useState<
    IBlogLikesCounterEntity[]
  >([]);

  const location = useLocation();
  const { blog, likes, comments }: IBlogListProps = location.state || {};

  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [newComment, setNewComment] = useState<ICommentCreateDto>({
    text: "",
    blogId: 0,
  });

  useEffect(() => {
    if (likes) {
      setLikesAndDislikeEntities(likes);
    }
  }, [likes]);

  useEffect(() => {
    if (comments) {
      setAllComment(comments);
    }
  }, [likes]);

  // console.log("this is the state details", blog, likes, comments);

  if (!blog) {
    return <p>No blog data available</p>;
  }

  const fetchUpdatedBlogData = async () => {
    try {
      const updatedBlog = await handleSubmitForBlogGetById(
        {
          preventDefault: () => {},
        } as React.FormEvent<HTMLFormElement>,
        blog.id
      );

      // console.log("this is the updated blog", updatedBlog);

      if (updatedBlog?.likes) {
        setLikesAndDislikeEntities(updatedBlog.likes);
      }

      if (updatedBlog?.comments) {
        // console.log("Updated comments from API:", updatedBlog.comments); // Debugging
        setAllComment(updatedBlog.comments);
      }
    } catch (error) {
      console.error("Failed to fetch updated blog data", error);
    }
  };

  const likeBlog = async () => {
    try {
      const newLike = await createLikeEntityApiCallFunction(blog.id);
      if (newLike) {
        setLikesAndDislikeEntities((previousLikes) => [
          ...previousLikes,
          newLike,
        ]);
      }
      await fetchUpdatedBlogData();
    } catch (error) {
      console.error("falied to create like", error);
    }
  };

  const dislikeBlog = async () => {
    // console.log("inside the like function");
    try {
      const newDislike = await createDislikeEntityApiCallFunction(blog.id);

      if (newDislike) {
        setLikesAndDislikeEntities((previousDislikes) => [
          ...previousDislikes,
          newDislike,
        ]);
      }
      await fetchUpdatedBlogData();
    } catch (error) {
      console.error("falied to create dislike", error);
    }
  };

  const changeStatusToNeutral = async () => {
    // console.log("inside the double click function");
    try {
      await changeLikeStatusApiCallFunction(blog.id);

      await handleSubmitForBlogGetById(
        {
          preventDefault: () => {},
        } as React.FormEvent<HTMLFormElement>,
        blog.id
      );
    } catch (error) {}
  };

  const createComment = async () => {
    // console.log("inside the create comment function");
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
        // setComment((previousComment) => [...previousComment, createdComment]);
        setNewComment({ blogId: blog.id, text: "" });
        setIsCommentFormVisible(false);
        await fetchUpdatedBlogData();
      }
    } catch (error) {
      console.log("this is the error", error);
    }
  };

  const removeCommentFromState = (commentId: number) => {
    setAllComment((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  const totalLikes =
    likesAndDislikeEntities?.filter(
      (like) => like.likedStatus === LikeStatus.LIKED
    ).length || 0;

  const totalDislikes =
    likesAndDislikeEntities?.filter(
      (dislike) => dislike.likedStatus === LikeStatus.DISLIKED
    ).length || 0;

  // console.log("this is the likesAndDislikeEntities", likesAndDislikeEntities);

  return (
    <div>
      <h1>{blog.title}</h1>
      <h4>{blog.keywords}</h4>
      <h4>{blog.author}</h4>
      <p>{blog.content}</p>
      <hr />
      <h3>Comments</h3>
      {allComments &&
        allComments.map((entity) => (
          <Comments
            id={entity.id}
            text={entity.text}
            authorId={entity.authorId}
            onDelete={removeCommentFromState}
          />
        ))}
      <GetAllButton
        onClick={() => setIsCommentFormVisible(!isCommentFormVisible)}
      >
        {isCommentFormVisible ? "Cancel" : "Add Comment"}
      </GetAllButton>
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
          <GetAllButton onClick={createComment}>Create</GetAllButton>
        </div>
      )}
      <h5>Total Likes: {totalLikes}</h5>
      <h5>Total Dislikes: {totalDislikes}</h5>
      <hr />
      <LikeButton onClick={likeBlog} onDoubleClick={changeStatusToNeutral}>
        Like
      </LikeButton>
      &nbsp;&nbsp;
      <DislikeButton
        onClick={dislikeBlog}
        onDoubleClick={changeStatusToNeutral}
      >
        Dislike
      </DislikeButton>
      &nbsp;&nbsp;
      <ColorButton>
        <Link style={{ textDecoration: "none", color: "white" }} to="/api">
          Go To HomePage
        </Link>
      </ColorButton>
    </div>
  );
}
