import { IBlogLikesCounterEntity, LikeStatus } from "blog-common-1.0";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { handleSubmitForBlogGetById } from "../api functions/blogs/blogs.api.calls.function";
import {
  changeLikeStatusApiCallFunction,
  createDislikeEntityApiCallFunction,
  createLikeEntityApiCallFunction,
} from "../api functions/likes/dislikes.api.calls.functions";
import { IBlogListProps } from "../interfaces/blog_list_prop.interface";

export default function IndividualBlog() {
  // const [comment, setComments] = useState<ICommentEntity[]>([]);
  const [likesAndDislikeEntities, setLikesAndDislikeEntities] = useState<
    IBlogLikesCounterEntity[]
  >([]);

  const location = useLocation();
  const navigate = useNavigate();
  const { blog, likes, comments }: IBlogListProps = location.state || {};

  useEffect(() => {
    if (likes) {
      setLikesAndDislikeEntities(likes);
    }
  }, [likes]);

  console.log("this is the state details", blog, likes, comments);

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

      if (updatedBlog?.likes) {
        setLikesAndDislikeEntities(updatedBlog.likes);
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
    console.log("inside the like function");
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

  const totalLikes =
    likesAndDislikeEntities?.filter(
      (like) => like.likedStatus === LikeStatus.LIKED
    ).length || 0;

  const totalDislikes =
    likesAndDislikeEntities?.filter(
      (dislike) => dislike.likedStatus === LikeStatus.DISLIKED
    ).length || 0;

  console.log("this is the likesAndDislikeEntities", likesAndDislikeEntities);

  return (
    <div>
      <h1>{blog.title}</h1>
      <h4>{blog.keywords}</h4>
      <h4>{blog.author}</h4>
      <p>{blog.content}</p>
      <hr />
      <h3>Comments</h3>
      {comments &&
        comments.map((comment) => (
          <div key={comment.id}>
            <h3>{comment.text}</h3>
            <h3>Comment created by user with id: {comment.authorId}</h3>
          </div>
        ))}
      <hr />
      <h5>Total Likes: {totalLikes}</h5>
      <h5>Total Dislikes: {totalDislikes}</h5>
      <hr />
      <button onClick={likeBlog} onDoubleClick={changeStatusToNeutral}>
        Like
      </button>{" "}
      &nbsp;&nbsp;
      <button onClick={dislikeBlog} onDoubleClick={changeStatusToNeutral}>
        Dislike
      </button>
    </div>
  );
}
