import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.toptal.com/developers/bcrypt/api/',
  }),
  endpoints: (builder) => ({
    validatePassword: builder.mutation<boolean, { password: string; hash: string }>({
      query: ({ password, hash }) => ({
        url: 'check-password.json',
        method: 'POST',
        body: `password=${encodeURIComponent(password)}&hash=${encodeURIComponent(hash)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
    }),
  }),
});

export const { useValidatePasswordMutation } = authApi;
