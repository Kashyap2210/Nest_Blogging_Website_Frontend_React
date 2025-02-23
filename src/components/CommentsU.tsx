import { IUserEntity } from "blog-common-1.0";
import { deleteCommentByIdApiCallFunction } from "../api functions/comments/comments.api.calls.function";
import { DeleteButton } from "../styling functions/button.style.function";

export interface ICommentProp {
  id: number;
  text: string;
  authorId: number;
  currentUser: IUserEntity | null;
  onDelete: Function;
}

export default function Comments({
  id,
  text,
  authorId,
  currentUser,
  onDelete,
}: ICommentProp) {
  const deleteComment = async (id: number) => {
    if (id === 0) {
      return;
    }
    const deletedComment = await deleteCommentByIdApiCallFunction(id);

    if (deletedComment) {
      onDelete(id);
    }
  };

  return (
    <div key={id} className="">
      <p className="my-2">{text}</p>
      <p className="my-2">
        <span className="italic">Comment written by:</span>{" "}
        <span className="font-bold">{authorId}</span>
      </p>
      {currentUser && currentUser.id === authorId && (
        <DeleteButton onClick={() => deleteComment(id ? id : 0)}>
          Delete Comment
        </DeleteButton>
      )}
    </div>
  );
}
