import { ICommentCreateDto } from "blog-common-1.0";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { createCommentApiCallFunction } from "../api functions/comments/comments.api.calls.function";
import { AuthContext } from "../context/AuthContext";
import { LikeButton } from "../styling functions/button.style.function";
import { addComment } from "../redux/commentSlice";

export interface ICommentFormProps {
  // onNewCommentCreate: Function;
  blogId?: number;
  commentId?: number;
}

export default function CommentForm({
  blogId,
  commentId,
}: // onNewCommentCreate,
ICommentFormProps) {
  const [newComment, setNewComment] = useState<ICommentCreateDto>({
    text: "",
    blogId: 0,
    isReplyComment: false,
    replyCommentId: 0,
  });
  // const [comment, setComments] = useState<ICommentEntity[]>([]);
  const [_isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const createComment = async () => {
    console.log("Inside the create comment function");
    if (!blogId) {
      console.error("Blog id is required");
      return;
    }

    try {
      console.log("this is the comment id", commentId);

      const commentData: ICommentCreateDto = {
        blogId: blogId,
        text: newComment.text,
        ...(commentId && { isReplyComment: true, replyCommentId: commentId }), // ✅ Only adds when commentId exists
      };

      const createdComment = await createCommentApiCallFunction(commentData);
      if (createdComment) {
        console.log("Comment created successfully:", createdComment);
        dispatch(addComment(createdComment));

        // Reset input field
        setNewComment({ blogId: blogId, text: "" });
        setIsCommentFormVisible(false);

        // Call onNewCommentCreate to trigger a re-fetch in BlogById
      }
    } catch (error) {
      console.error("Error creating comment:", error);
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
