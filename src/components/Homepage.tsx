import { useNavigate } from "react-router";

export default function HomePage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/api/login');
    };

    const handleCreateBlog = () => {
        navigate('/api/createBlog');
    };

    const handleUpdateBlog = () => {
        navigate('/api/updateBlog');
    };

    const handleCreateUser = () => {
        navigate('/api/createUser');
    };

    const handleCreateComment = () => {
        navigate('/api/createComment');
    };

    const handleBlogById = () => {
        navigate('/api/getBlogById')
    }

    return (
        <div>

            <button onClick={handleLogin}>Login</button>
            <button onClick={handleCreateBlog}>Create Blog</button>
            <button onClick={handleUpdateBlog}>Update Blog</button>
            <button onClick={handleCreateUser}>Create User</button>
            <button onClick={handleCreateComment}>Create Comment</button>
            <button onClick={handleBlogById}>Get Blog By Id</button>
        </div>
    )
}