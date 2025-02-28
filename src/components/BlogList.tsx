import {
  IBlogEntity,
  IBlogLikesCounterEntity,
  LikeStatus,
} from "blog-common-1.0";

interface BlogListProps {
  likes: IBlogLikesCounterEntity[];
  blog: IBlogEntity;
}

export default function BlogList({ blog, likes }: BlogListProps) {
  const totalLikes =
    likes?.filter((like) => like.likedStatus === LikeStatus.LIKED).length || 0;

  const totalDislikes =
    likes?.filter((dilsike) => dilsike.likedStatus === LikeStatus.DISLIKED)
      .length || 0;
  return (
    <div>
      <hr />
      <h2>{blog.title}</h2>
      <h4>{blog.keywords}</h4>
      <h5>{blog.author}</h5>
      <h5>Likes:{totalLikes}</h5>
      <h5>Dislikes:{totalDislikes}</h5>
    </div>
  );
}
