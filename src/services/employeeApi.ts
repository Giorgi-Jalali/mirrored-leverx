import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEmployee } from '../types/EmployeeTypes';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    getEmployees: builder.query<IEmployee[], void>({
      query: () => 'users/',
    }),
  }),
});

export const { useGetEmployeesQuery } = employeeApi;
