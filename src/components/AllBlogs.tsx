import axios from "axios";
import { IBlogResponse } from "blog-common-1.0";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { getAllBlogsApiCallFunction } from "../api functions/blogs/blogs.api.calls.function";
import { setBlogs } from "../redux/blogSlice";
import { setCommentsRedux } from "../redux/commentSlice";
import { setLikesAndDislikeEntities } from "../redux/likesAndDislikesSlice";
import { RootState } from "../redux/store";
import { setUsers } from "../redux/userSlice";
import {
  ColorButton,
  GetAllButton,
} from "../styling functions/button.style.function";
import BlogList from "./BlogList";

export default function AllBlogs() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBlogs([]));
    dispatch(setCommentsRedux([]));
    dispatch(setLikesAndDislikeEntities([]));
  }, [dispatch]);

  const blogArray = useSelector((state: RootState) => state.blogs.blogs);
  const commentsArray = useSelector(
    (state: RootState) => state.comments.comments
  );
  const likesAndDislikeEntities = useSelector(
    (state: RootState) => state.likesAndDislikes.likesAndDislikeEntities
  );

  const users = useSelector((state: RootState) => state.users.users);

  const getAllBlogs = async () => {
    try {
      const allBlogs: IBlogResponse[] | undefined =
        await getAllBlogsApiCallFunction();

      let blogs: IBlogResponse[] = [];
      if (allBlogs) {
        allBlogs.map((blog) => blogs.push(blog));
        dispatch(setBlogs(blogs.map((blog) => blog.blog)));

        const comments = blogs.map((blog) => blog.comments).flat();
        dispatch(setCommentsRedux(comments));

        const likesAndDislikeEntities = blogs.map((blog) => blog.likes).flat();
        dispatch(setLikesAndDislikeEntities(likesAndDislikeEntities));
      }

      const userEntities = blogs.map((blog) => blog.users).flat();
      dispatch(setUsers(userEntities));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("this is the error", error.response?.data);
      }
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <GetAllButton onClick={getAllBlogs}>Get All Blogs</GetAllButton>
        <ColorButton>
          <Link style={{ textDecoration: "none", color: "white" }} to="/api">
            Go To HomePage
          </Link>
        </ColorButton>
      </div>
      <div>
        <ul>
          {blogArray.map((blog) => (
            <BlogList
              key={blog.id}
              blog={blog}
              likes={likesAndDislikeEntities.filter(
                (entity) => entity.blogId === blog.id
              )}
              comments={commentsArray.filter(
                (comment) => comment.blogId === blog.id
              )}
              users={users}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
