import BlogCreate from './BlogCreate';
import BlogUpdate from './BlogUpdate';
import Login from './Login';
import UserCreate from './UserCreate';

export default function BlogGrandContainer() {
  return (
    <>
      <UserCreate />
      <br />
      <br />
      <br />
      <hr />
      <br />
      <br />
      <br />
      <Login />
      <br />
      <br />
      <br />
      <hr />
      <BlogCreate />
      <br />
      <br />
      <br />
      <hr />
      <BlogUpdate />
      <br />
      <br />
      <br />
      <hr />
    </>
  );
}
