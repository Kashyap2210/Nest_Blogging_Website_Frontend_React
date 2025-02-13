import { deleteCommentByIdApiCallFunction } from "../api functions/comments/comments.api.calls.function";
import { DeleteButton } from "../styling functions/button.style.function";

export interface ICommentProp {
  id: number;
  text: string;
  authorId: number;
  onDelete: Function;
}

export default function Comments({
  id,
  text,
  authorId,
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
    <div key={id}>
      <p>{text}</p>
      <p>{authorId}</p>
      <DeleteButton onClick={() => deleteComment(id ? id : 0)}>
        Delete Comment
      </DeleteButton>
      <hr />
    </div>
  );
}
