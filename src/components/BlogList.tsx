import { LikeStatus } from "blog-common-1.0";
import { IBlogListProps } from "../interfaces/blog_list_prop.interface";
import { useNavigate } from "react-router";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function BlogList({
  blog,
  likes,
  comments,
  users,
}: IBlogListProps) {
  const navigate = useNavigate();

  const viewIndividualBlog = () => {
    navigate("/api/readIndividualBlog", {
      state: { blog, likes, comments, users },
    });
  };

  const totalLikes =
    likes?.filter((like) => like.likedStatus === LikeStatus.LIKED).length || 0;

  const totalDislikes =
    likes?.filter((dilsike) => dilsike.likedStatus === LikeStatus.DISLIKED)
      .length || 0;

  return (
    <div className="my-4 px-2">
      {/* <hr /> */}
      <div
        className="flex items-center justify-items-center
"
      >
        <ArrowRightIcon className="text-red-500" />
        <h2
          onClick={viewIndividualBlog}
          style={{ textDecoration: "none", cursor: "pointer" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.textDecoration = "underline")
          }
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          className="text-2xl"
        >
          {blog.title}
        </h2>
      </div>
      <h4 className="text-sm ml-6">{blog.keywords}</h4>
      <h5 className="ml-6">
        <span className="italic">Written By </span>
        <span className="font-semibold">{blog.author}</span>
      </h5>
      <div className="flex gap-4 ml-6">
        <h5>
          <span className="font-semibold mr-1">Likes:</span>
          {totalLikes}
        </h5>
        <h5>
          <span className="font-semibold mr-1">Dislikes:</span>
          {totalDislikes}
        </h5>
      </div>
    </div>
  );
}
