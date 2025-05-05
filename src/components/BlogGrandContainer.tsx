import { Route, Routes } from "react-router";
import AllBlogs from "./AllBlogs";
import BlogById from "./BlogById";
import BlogCreate from "./BlogCreate";
import BlogUpdate from "./BlogUpdate";
import Creators from "./Creators";
import HomePage from "./Homepage";
import IndividualBlog from "./IndividualBlog";
import Login from "./Login";
import UserCreate from "./UserCreate";
import Profile from "./UserProfile";

export default function BlogGrandContainer() {
  return (
    <Routes>
      <Route path="/api" element={<HomePage />} />
      <Route path="/api/createBlog" element={<BlogCreate />} />
      <Route path="/api/updateBlog" element={<BlogUpdate />} />
      <Route path="/api/createUser" element={<UserCreate />} />
      <Route path="/api/login" element={<Login />} />
      <Route path="/api/getBlogById" element={<BlogById />} />
      <Route path="/api/getAllBlogs" element={<AllBlogs />} />
      <Route path="/api/readIndividualBlog" element={<IndividualBlog />} />
      <Route path="/api/profile" element={<Profile />} />
      <Route path="/api/creators" element={<Creators />} />
    </Routes>
  );
}
