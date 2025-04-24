import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlogEntity } from "blog-common-1.0";

export interface IBlogsState {
  blogs: IBlogEntity[];
}

const initialState: IBlogsState = {
  blogs: [],
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog: (state, action: PayloadAction<IBlogEntity>) => {
      state.blogs.push(action.payload);
    },
    setBlogs: (state, action: PayloadAction<IBlogEntity[]>) => {
      state.blogs = action.payload;
    },
    updateBlog: (state, action: PayloadAction<IBlogEntity>) => {
      const index = state.blogs.findIndex(
        (blog) => blog.id === action.payload.id
      );
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
    },
    searchedBlog: (state, action: PayloadAction<IBlogEntity[]>) => {
      state.blogs = action.payload;
    },
  },
});

export const { addBlog, setBlogs, updateBlog, searchedBlog } =
  blogsSlice.actions;

export default blogsSlice.reducer;
