import { useNavigate } from "react-router";
import { ColorButton } from "../styling functions/button.style.function";

export default function HomePage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/api/login");
  };

  const handleCreateBlog = () => {
    navigate("/api/createBlog");
  };

  const handleUpdateBlog = () => {
    navigate("/api/updateBlog");
  };

  const handleCreateUser = () => {
    navigate("/api/createUser");
  };

  const handleCreateComment = () => {
    navigate("/api/createComment");
  };

  const handleBlogById = () => {
    navigate("/api/getBlogById");
  };

  const handleAllBlogs = () => {
    navigate("/api/getAllBlogs");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-left border">
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-red-500">Homepage!</h1>{" "}
      </div>
      <div className="">
        <ColorButton onClick={handleLogin} variant="contained" color="success">
          Login
        </ColorButton>
        <br />
        <br />
        <ColorButton onClick={handleCreateBlog}>Create Blog</ColorButton>
        <br />
        <br />
        <ColorButton onClick={handleUpdateBlog}>Update Blog</ColorButton>
        <br />
        <br />
        <ColorButton onClick={handleCreateUser}>Create User</ColorButton>
        <br />
        <br />
        <ColorButton onClick={handleCreateComment}>Create Comment</ColorButton>
        <br />
        <br />
        <ColorButton onClick={handleBlogById}>Get Blog By Id</ColorButton>
        <br />
        <br />
        <ColorButton onClick={handleAllBlogs}>Get All Blogs</ColorButton>
        <br />
        <br />
      </div>
    </div>
  );
}
