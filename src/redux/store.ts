import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/search/searchSlice';
import { employeeApi } from '../services/employeeApi';
import { userApi } from '../services/userApi';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
