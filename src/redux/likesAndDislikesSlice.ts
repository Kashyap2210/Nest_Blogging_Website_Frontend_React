import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlogLikesCounterEntity } from "blog-common-1.0";

export interface IBlogLikesCounterState {
  likesAndDislikeEntities: IBlogLikesCounterEntity[];
}

const initialState: IBlogLikesCounterState = {
  likesAndDislikeEntities: [],
};

const likesAndDislikesSlice = createSlice({
  name: "likesAndDislikes",
  initialState,
  reducers: {
    addLikeDislikeEntities: (
      state,
      action: PayloadAction<IBlogLikesCounterEntity>
    ) => {
      state.likesAndDislikeEntities.push(action.payload);
    },
    setLikesAndDislikeEntities: (
      state,
      action: PayloadAction<IBlogLikesCounterEntity[]>
    ) => {
      state.likesAndDislikeEntities = action.payload;
    },
  },
});

export const { addLikeDislikeEntities, setLikesAndDislikeEntities } =
  likesAndDislikesSlice.actions;

export default likesAndDislikesSlice.reducer;
