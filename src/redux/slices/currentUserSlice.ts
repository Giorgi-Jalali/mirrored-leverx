import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployee } from "src/types/EmployeeTypes";

interface IUserState {
  currentUser: IEmployee | undefined;
}

const initialState: IUserState = {
  currentUser: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<IEmployee>) {
      state.currentUser = action.payload;
    },
    clearCurrentUser(state) {
      state.currentUser = undefined;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;
