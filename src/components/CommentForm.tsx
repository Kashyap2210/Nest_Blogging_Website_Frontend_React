import { ICommentCreateDto, ICommentEntity } from "blog-common-1.0";
import { useContext, useState } from "react";
import { createCommentApiCallFunction } from "../api functions/comments/comments.api.calls.function";
import { AuthContext } from "../context/AuthContext";
import { LikeButton } from "../styling functions/button.style.function";

export interface ICommentFormProps {
  blogId?: number;
  commentId?: number;
}

export default function CommentForm({ blogId, commentId }: ICommentFormProps) {
  const [newComment, setNewComment] = useState<ICommentCreateDto>({
    text: "",
    blogId: 0,
    isReplyComment: false,
    replyCommentId: 0,
  });
  const [_comment, setComments] = useState<ICommentEntity[]>([]);
  const [_isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  const { user } = useContext(AuthContext);

  const createComment = async () => {
    console.log("Inside the create comment function");
    if (!blogId) {
      console.error("Blog id is required");
      return;
    }

    try {
      console.log("this is the comment id", commentId);
      let commentData: ICommentCreateDto = {
        text: "",
        blogId: 0,
      };
      if (!commentId) {
        commentData = {
          blogId: blogId,
          text: newComment?.text,
        };
      } else {
        commentData = {
          blogId: blogId,
          text: newComment?.text,
          isReplyComment: true,
          replyCommentId: commentId,
        };
      }

      const createdComment = await createCommentApiCallFunction(commentData);
      if (createdComment) {
        setComments((previousComment) => [...previousComment, createdComment]);
        setNewComment({ blogId: blogId, text: "" });
        setIsCommentFormVisible(false);
      }
    } catch (error) {
      console.log("this is the error", error);
    }
  };

  return user ? (
    <div className="flex justify-start items-center gap-4">
      <input
        type="text"
        name="comment"
        value={newComment.text}
        onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
        className="border rounded-sm h-9 p-2"
        placeholder="Enter comment"
      />
      <LikeButton onClick={createComment}>Create</LikeButton>
    </div>
  ) : null;
}
