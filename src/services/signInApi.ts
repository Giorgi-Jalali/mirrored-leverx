import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEmployee } from 'src/types/EmployeeTypes';

export const signInApi = createApi({
  reducerPath: 'signInApi',
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/users/" }),
  baseQuery: fetchBaseQuery({ baseUrl: "https://mirrored-leverx.vercel.app/api/server/users/" }),
  endpoints: (builder) => ({
    loadUsers: builder.query<IEmployee[], void>({
      query: () => '',
    }),
    checkPassword: builder.mutation<boolean, { password: string; hash: string }>({
      query: ({ password, hash }) => ({
        url: 'https://www.toptal.com/developers/bcrypt/api/check-password.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `password=${encodeURIComponent(password)}&hash=${encodeURIComponent(hash)}`,
      }),
      transformResponse: (response: { ok: boolean }) => response.ok,
    }),
  }),
});

export const { useLoadUsersQuery, useCheckPasswordMutation } = signInApi;
