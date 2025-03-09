import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./commentSlice";
import blogsReducer from "./blogSlice";
import likesAndDislikesReducer from "./likesAndDislikesSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    blogs: blogsReducer,
    likesAndDislikes: likesAndDislikesReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
