import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import currentUserReducer from "./slices/currentUserSlice";
import { employeeApi } from "../services/employeeApi";
import { userApi } from "../services/userApi";
import { signInApi } from "../services/signInApi";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    user: currentUserReducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [signInApi.reducerPath]: signInApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      employeeApi.middleware,
      userApi.middleware,
      signInApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
