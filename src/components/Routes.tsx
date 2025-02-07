import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import AllBlogs from "./AllBlogs";
import BlogById from "./BlogById";
import BlogCreate from "./BlogCreate";
import BlogUpdate from "./BlogUpdate";
import Comment from "./Comment";
import Login from "./Login";
import UserCreate from "./UserCreate";

const root : HTMLElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
    <BrowserRouter>
    <Routes>
        <Route path="/api/createBlog" element={<BlogCreate/>} />
        <Route path="/api/updateBlog" element={<BlogUpdate/>} />
        <Route path="/api/createUser" element={<UserCreate/>} />
        <Route path="/api/login" element={<Login/>} />
        <Route path="/api/createComment" element={<Comment/>} />
        <Route path="/api/getBlogById" element={<BlogById/>} />
        <Route path="/api/getAllBlogs" element={<AllBlogs/>} />

    </Routes>
    </BrowserRouter>
)
