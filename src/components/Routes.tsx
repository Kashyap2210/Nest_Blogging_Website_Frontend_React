import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import BlogUpdate from "./BlogUpdate";
import Login from "./Login";
import UserCreate from "./UserCreate";
import BlogCreate from "./BlogCreate";
import Comment from "./Comment";
import BlogById from "./BlogById";

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

    </Routes>
    </BrowserRouter>
)
