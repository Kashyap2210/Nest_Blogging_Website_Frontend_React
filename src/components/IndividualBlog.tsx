import { LikeStatus } from "blog-common-1.0";
import { useLocation, useNavigate } from "react-router";
import { IBlogListProps } from "../interfaces/blog_list_prop.interface";

export default function IndividualBlog() {
  const location = useLocation();
  const navigate = useNavigate();
  const { blog, likes, comments }: IBlogListProps = location.state || {};

  console.log("this is the state details", blog, likes, comments);

  const totalLikes =
    likes?.filter((like) => like.likedStatus === LikeStatus.LIKED).length || 0;

  const totalDislikes =
    likes?.filter((dislike) => dislike.likedStatus === LikeStatus.DISLIKED)
      .length || 0;

  if (!blog) {
    return <p>No blog data available</p>;
  }

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
    </div>
  );
}
