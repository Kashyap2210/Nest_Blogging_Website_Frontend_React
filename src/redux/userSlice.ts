import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserEntity } from "blog-common-1.0";

export interface IUserState {
  users: IUserEntity[];
}

const initialState: IUserState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUserEntity>) => {
      state.users.push(action.payload);
    },
    setUsers: (state, action: PayloadAction<IUserEntity[]>) => {
      state.users = action.payload;
    },
  },
});

export const { addUser, setUsers } = userSlice.actions;

export default userSlice.reducer;
