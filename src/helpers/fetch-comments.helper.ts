import { ICommentEntity } from "blog-common-1.0";
import { search } from "../api functions/comments/comments.api.calls.function";

export const fetchComments = async (
  blogId: number
): Promise<ICommentEntity[] | undefined> => {
  const allCommentsForTheBlog = await search({
    blogId: [blogId],
  });
  console.log("this is all the comments for blogs", allCommentsForTheBlog);

  return allCommentsForTheBlog ?? [];
};
