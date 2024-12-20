import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEmployee } from '../types/EmployeeTypes';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({

    getEmployees: builder.query<IEmployee[], void>({
      query: () => 'users/',
    }),

    updateEmployeeRole: builder.mutation<IEmployee, { id: string, role: string }>({
      query: ({ id, role }) => {
        return {
          url: `users/${id}`,
          method: 'PATCH',
          body: { role },
        };
      },
      transformResponse: (response: IEmployee) => response,
    }),    
  }),
});

export const { useGetEmployeesQuery, useUpdateEmployeeRoleMutation } = employeeApi;

