import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlogResponse } from "blog-common-1.0";

export interface IBlogResponseState {
  individualBlog: IBlogResponse[];
}

const initialStateForResponse: IBlogResponseState = {
  individualBlog: [],
};

const blogsSliceForIndividualBlog = createSlice({
  name: "individualBlogs",
  initialState: initialStateForResponse,
  reducers: {
    setBlogForIndividualBlog: (
      state,
      action: PayloadAction<IBlogResponse[]>
    ) => {
      state.individualBlog = action.payload;
    },
  },
});

export const { setBlogForIndividualBlog } = blogsSliceForIndividualBlog.actions;

export default blogsSliceForIndividualBlog.reducer;
