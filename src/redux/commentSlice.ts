import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommentEntity } from "blog-common-1.0";

export interface ICommentsState {
  comments: ICommentEntity[];
}

const initialState: ICommentsState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<ICommentEntity>) => {
      state.comments.push(action.payload);
    },
    setCommentsRedux: (state, action: PayloadAction<ICommentEntity[]>) => {
      state.comments = action.payload;
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
});

export const { addComment, setCommentsRedux, removeComment } =
  commentsSlice.actions;
export default commentsSlice.reducer;
