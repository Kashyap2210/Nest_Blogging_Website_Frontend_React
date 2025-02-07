import { IBlogEntity } from "blog-common-1.0";

interface BlogListProps {
  blog: IBlogEntity;
}

export default function BlogList({ blog }: BlogListProps) {
  return (
    <div>
      <hr />
      <h2>{blog.title}</h2>
      <h4>{blog.keywords}</h4>
      <h5>{blog.author}</h5>
    </div>
  );
}
