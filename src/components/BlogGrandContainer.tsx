import { Route, Routes } from 'react-router';
import BlogCreate from './BlogCreate';
import BlogUpdate from './BlogUpdate';
import HomePage from './Homepage';
import Login from './Login';
import UserCreate from './UserCreate';
import Comment from './Comment';
import BlogById from './BlogById';

export default function BlogGrandContainer() {
  return (
    <Routes>
      <Route path="/api" element={<HomePage />} />
      <Route path="/api/createBlog" element={<BlogCreate />} />
      <Route path="/api/updateBlog" element={<BlogUpdate />} />
      <Route path="/api/createUser" element={<UserCreate />} />
      <Route path="/api/login" element={<Login />} />
      <Route path="/api/createComment" element={<Comment />} />
      <Route path="/api/createComment" element={<Comment />} />
      <Route path="/api/getBlogById" element={<BlogById/>} />
    </Routes>
  );
}
