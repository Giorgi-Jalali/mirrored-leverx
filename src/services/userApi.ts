import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEmployee } from '../types/EmployeeTypes';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/users/' }),
  endpoints: (builder) => ({
    getUserById: builder.query<IEmployee, string>({
      query: (id) => `${id}`,
    }),
    updateUser: builder.mutation<IEmployee, IEmployee>({
      query: (user) => ({
        url: `${user.id}`,
        method: 'PUT',
        body: user,
      }),
    }),
  }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi;