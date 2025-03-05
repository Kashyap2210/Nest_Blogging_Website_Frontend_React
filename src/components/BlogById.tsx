import {
  IBlogEntity,
  IBlogLikesCounterEntity,
  ICommentEntity,
  LikeStatus,
} from "blog-common-1.0";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { handleSubmitForBlogGetById } from "../api functions/blogs/blogs.api.calls.function";
import { search } from "../api functions/comments/comments.api.calls.function";
import {
  changeLikeStatusApiCallFunction,
  createDislikeEntityApiCallFunction,
  createLikeEntityApiCallFunction,
} from "../api functions/likes/dislikes.api.calls.functions";
import { AuthContext } from "../context/AuthContext";
import { removeComment, setCommentsRedux } from "../redux/commentSlice";
import { RootState } from "../redux/store";
import {
  ColorButton,
  DislikeButton,
  LikeButton,
} from "../styling functions/button.style.function";
import CommentForm from "./CommentForm";
import Comments from "./CommentsU";

export default function BlogById() {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    blogId: 0,
  });
  const [blog, setBlog] = useState<IBlogEntity | null>(null);
  // const [comment, setComments] = useState<ICommentEntity[]>([]);
  const [likesAndDislikeEntities, setLikesAndDislikeEntities] = useState<
    IBlogLikesCounterEntity[]
  >([]);
  const dispatch = useDispatch();
  const comments = useSelector((state: RootState) => state.comments.comments);

  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

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
    e.preventDefault();

    const response = await handleSubmitForBlogGetById(e, formData.blogId);

    console.log("this is the user", user);

    if (response) {
      setBlog(response.blog);
      // setComments(response.comments);
      setLikesAndDislikeEntities(response.likes);
    }
  };

  const removeCommentFromState = (commentId: number) => {
    dispatch(removeComment(commentId));
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
    // console.log("inside the like function");
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
    // console.log("inside the double click function");
    try {
      await changeLikeStatusApiCallFunction(formData.blogId);

      await handleSubmitForBlogById({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (blog) {
        const fetchedComments: ICommentEntity[] | undefined = await search({
          blogId: [blog.id],
        });
        if (Array.isArray(fetchedComments)) {
          dispatch(setCommentsRedux(fetchedComments));
        } else {
          console.error("Fetched comments is not an array:", fetchedComments);
        }
      }
    };

    fetchComments();
  }, [blog?.id, dispatch, comments.length]); // Re-fetch when comments change

  return (
    <>
      <div className="p-4 min-h-screen">
        <div className="flex gap-4 h-8">
          <form onSubmit={handleSubmitForBlogById} className="">
            <input
              type="text"
              placeholder="Blog Id"
              name="blogId"
              value={formData?.blogId}
              onChange={handleChange}
              className="h-8 border rounded-sm pl-2"
            />
          </form>
          <ColorButton
            type="submit"
            onClick={() =>
              handleSubmitForBlogById({ preventDefault: () => {} } as any)
            }
          >
            Get Blog
          </ColorButton>
          <ColorButton>
            <Link style={{ textDecoration: "none", color: "white" }} to="/api">
              Go To HomePage
            </Link>
          </ColorButton>
        </div>
        {blog && (
          <div className="">
            <div className="h-20 flex justify-start items-center text-4xl font-semibold">
              {blog.title}
            </div>
            <div className="h-12">{blog.keywords}</div>
            <div className="text-justify">{blog.content}</div>
            <div className="h-8 flex justify-start items-center text-2xl mt-4">
              <span className="">Written By, </span>
              <span className="italic font-semibold">&nbsp;{blog.author}</span>
            </div>
          </div>
        )}

        <h2 className="mb-2 text-3xl font-semibold">Comments</h2>
        {comments &&
          comments.map((mapping) => (
            <div className="mb-4" key={mapping.id}>
              <Comments
                commentId={mapping.id}
                blogId={blog?.id}
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
            <CommentForm
              blogId={blog?.id}
              // onNewCommentCreate={handleNewComment}
            ></CommentForm>
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
            <h4>Total Likes: {totalLikes?.length}</h4>
            <h4>Total DisLikes: {totalDisLikes?.length}</h4>
          </div>
        )}

        <div className=" flex mt-4">
          <div className="mr-4">
            <LikeButton
              onClick={likeBlog}
              onDoubleClick={changeStatusToNeutral}
            >
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
      </div>
    </>
  );
}
