import { IUserEntity } from "blog-common-1.0";
import { useContext, useState } from "react";
import { deleteCommentByIdApiCallFunction } from "../api functions/comments/comments.api.calls.function";
import { AuthContext } from "../context/AuthContext";
import {
  DeleteButton,
  LikeButton,
} from "../styling functions/button.style.function";
import CommentForm from "./CommentForm";

export interface ICommentProp {
  commentId: number;
  blogId?: number;
  text: string;
  authorId: number;
  currentUser: IUserEntity | null;
  replyCommentId: number;
  onDelete: Function;
}

export default function Comments({
  commentId,
  blogId,
  text,
  authorId,
  currentUser,
  replyCommentId,
  onDelete,
}: ICommentProp) {
  const [isReplyComment, setIsReplyComment] = useState<boolean>(false);

  const { user } = useContext(AuthContext);

  const deleteComment = async (id: number) => {
    if (id === 0) {
      return;
    }
    console.log("Delete function is called");
    const deletedComment = await deleteCommentByIdApiCallFunction(id);

    if (deletedComment) {
      onDelete(id);
    }
  };

  return (
    <div key={commentId} className="">
      <p className="my-2">{text}</p>
      <p className="my-2">
        <span className="italic">Comment written by:</span>{" "}
        <span className="font-bold">{authorId}</span>
        <br />
        {replyCommentId && <span>This is reply to: {replyCommentId}</span>}
      </p>
      <div className="flex flex-col w-40 items-start gap-4">
        {currentUser && currentUser.id === authorId && (
          <DeleteButton
            onClick={() => deleteComment(commentId ? commentId : 0)}
          >
            Delete Comment
          </DeleteButton>
        )}
        {user && (
          <LikeButton onClick={() => setIsReplyComment(true)}>Reply</LikeButton>
        )}
      </div>
      {isReplyComment && (
        <CommentForm blogId={blogId} commentId={commentId}></CommentForm>
      )}
    </div>
  );
}
