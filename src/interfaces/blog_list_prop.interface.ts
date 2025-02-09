import {
  IBlogEntity,
  IBlogLikesCounterEntity,
  ICommentEntity,
} from "blog-common-1.0";

export interface IBlogListProps {
  likes: IBlogLikesCounterEntity[];
  blog: IBlogEntity;
  comments: ICommentEntity[];
}
