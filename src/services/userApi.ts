import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { employeeApi } from './employeeApi';
import { IEmployee } from '../types/EmployeeTypes';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mirrored-leverx.vercel.app/api/server/users/' }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/users/' }),
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
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          dispatch(employeeApi.util.invalidateTags([{ type: 'Employee' }]));
        } catch (error) {
          console.error('Error updating user:', error);
        }
      },
    }),
  }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi;
