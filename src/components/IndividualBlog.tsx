import { ICommentCreateDto, LikeStatus } from "blog-common-1.0";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { handleSubmitForBlogGetById } from "../api functions/blogs/blogs.api.calls.function";
import { createCommentApiCallFunction } from "../api functions/comments/comments.api.calls.function";
import {
  changeLikeStatusApiCallFunction,
  createDislikeEntityApiCallFunction,
  createLikeEntityApiCallFunction,
} from "../api functions/likes/dislikes.api.calls.functions";
import { AuthContext } from "../context/AuthContext";
import { IBlogListProps } from "../interfaces/blog_list_prop.interface";
import { addComment, removeComment } from "../redux/commentSlice";
import {
  addLikeDislikeEntities,
  setLikesAndDislikeEntities,
} from "../redux/likesAndDislikesSlice";
import { RootState } from "../redux/store";
import {
  ColorButton,
  DislikeButton,
  LikeButton,
} from "../styling functions/button.style.function";
import Comments from "./Comments";

export default function IndividualBlog() {
  const location = useLocation();
  const dispatch = useDispatch();
  const allComments = useSelector(
    (state: RootState) => state.comments.comments
  );
  // console.log("this are all comments from redux", allComments);

  const likesAndDislikeEntities = useSelector(
    (state: RootState) => state.likesAndDislikes.likesAndDislikeEntities
  );

  const {
    blog,
    likes,
    comments: passedComments,
  }: IBlogListProps = location.state || {};

  const commentsToShow = passedComments?.length
    ? passedComments
    : allComments.filter((comment) => comment.blogId === blog.id);

  // console.log("this is th e location.state", location.state);

  // console.log("this is the blogs and likes from individual blog", blog);

  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [newComment, setNewComment] = useState<ICommentCreateDto>({
    text: "",
    blogId: 0,
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (likes) {
      dispatch(setLikesAndDislikeEntities(likes));
    }
  }, [likes]);

  if (!blog) {
    return <p>No blog data available</p>;
  }

  const likeBlog = async () => {
    try {
      const newLike = await createLikeEntityApiCallFunction(blog.id);
      if (newLike) {
        dispatch(addLikeDislikeEntities(newLike));
      }
    } catch (error) {
      console.error("falied to create like", error);
    }
  };

  const dislikeBlog = async () => {
    try {
      const newDislike = await createDislikeEntityApiCallFunction(blog.id);

      if (newDislike) {
        dispatch(addLikeDislikeEntities(newDislike));
      }
    } catch (error) {
      console.error("falied to create dislike", error);
    }
  };

  const changeStatusToNeutral = async () => {
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
        setNewComment({ blogId: blog.id, text: "" });
        setIsCommentFormVisible(false);
        dispatch(addComment(createdComment));
      }
    } catch (error) {
      console.log("this is the error", error);
    }
  };

  const removeCommentFromState = (commentId: number) => {
    dispatch(removeComment(commentId));
  };

  const totalLikes =
    likesAndDislikeEntities?.filter(
      (like) => like.likedStatus === LikeStatus.LIKED
    ).length || 0;

  const totalDislikes =
    likesAndDislikeEntities?.filter(
      (dislike) => dislike.likedStatus === LikeStatus.DISLIKED
    ).length || 0;

  return (
    <div className="p-4 min-h-screen">
      {blog && (
        <div className="mb-4">
          <div className="h-12 mb-4 flex justify-start items-center text-4xl font-semibold">
            {blog.title}
          </div>
          <div className="h-12 ">{blog.keywords}</div>
          <div className="text-justify whitespace-pre-wrap">{blog.content}</div>
          <div className="h-8 flex justify-start items-center text-2xl mt-4">
            <span className="">Written By, </span>
            <span className="italic font-semibold">&nbsp;{blog.author}</span>
          </div>
        </div>
      )}

      <h2 className="mb-2 text-3xl font-semibold">Comments</h2>
      {commentsToShow &&
        commentsToShow.map((mapping) => (
          <div className="mb-4" key={mapping.id}>
            <Comments
              commentId={mapping.id}
              text={mapping.text}
              authorId={mapping.authorId}
              currentUser={user}
              replyCommentId={mapping.replyCommentId}
              onDelete={removeCommentFromState}
            />
          </div>
        ))}

      <div className="flex gap-4 mb-8">
        {isCommentFormVisible && (
          <div className="flex justify-start items-center gap-4">
            <input
              type="text"
              name="comment"
              value={newComment.text}
              onChange={(e) =>
                setNewComment({ ...newComment, text: e.target.value })
              }
              className="border rounded-sm h-9 p-2"
            />
            <LikeButton onClick={createComment}>Create</LikeButton>
          </div>
        )}
        <ColorButton
          onClick={() => setIsCommentFormVisible(!isCommentFormVisible)}
        >
          {isCommentFormVisible ? "Cancel" : "Add Comment"}
        </ColorButton>
      </div>
      <hr />
      {likesAndDislikeEntities && (
        <div>
          <h4>Total Likes: {totalLikes}</h4>
          <h4>Total DisLikes: {totalDislikes}</h4>
        </div>
      )}

      <div className=" flex mt-4 my-4">
        <div className="mr-4">
          <LikeButton onClick={likeBlog} onDoubleClick={changeStatusToNeutral}>
            Like
          </LikeButton>
        </div>
        <div className="">
          <DislikeButton
            onClick={dislikeBlog}
            onDoubleClick={changeStatusToNeutral}
          >
            Dislike
          </DislikeButton>
        </div>
      </div>

      <ColorButton>
        <Link style={{ textDecoration: "none", color: "white" }} to="/api">
          Go To HomePage
        </Link>
      </ColorButton>
    </div>
  );
}
