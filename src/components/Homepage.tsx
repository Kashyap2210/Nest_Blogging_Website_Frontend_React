import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthProvider";

export default function HomePage() {
  const navigate = useNavigate();
  const { logOut, user } = useAuth();

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

  const handleBlogById = () => {
    navigate("/api/getBlogById");
  };

  const handleAllBlogs = () => {
    navigate("/api/getAllBlogs");
  };

  const handleLogout = () => {
    logOut();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-left border">
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-red-500">Homepage!</h1>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Button onClick={handleLogin} size={"lg"} className="w-full p-4 w-40">
          Login
        </Button>
        <Button
          onClick={handleCreateBlog}
          size={"lg"}
          className="w-full p-4 w-40"
        >
          Create Blog
        </Button>
        <Button
          onClick={handleUpdateBlog}
          size={"lg"}
          className="w-full p-4 w-40"
        >
          Update Blog
        </Button>
        {user && user.role === "TOAA" && (
          <Button
            onClick={handleCreateUser}
            size={"lg"}
            className="w-full p-4 w-40"
          >
            Create User
          </Button>
        )}
        <Button
          onClick={handleBlogById}
          size={"lg"}
          className="w-full p-4 w-40"
        >
          Get Blog By Id
        </Button>
        <Button
          onClick={handleAllBlogs}
          size={"lg"}
          className="w-full p-4 w-40"
        >
          Get All Blogs
        </Button>
        <Button onClick={handleLogout} size={"lg"} className="w-full p-4 w-40">
          Logout
        </Button>
        {/* <br />
        <br /> */}
        {user ? (
          <div>"User is logged In"</div>
        ) : (
          <div>"User is logged out"</div>
        )}
      </div>
    </div>
  );
}
