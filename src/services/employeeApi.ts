import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEmployee } from '../types/EmployeeTypes';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Employee'],
  endpoints: (builder) => ({
    getEmployees: builder.query<IEmployee[], void>({
      query: () => 'users/',
      providesTags: ['Employee'],
    }),

    updateEmployeeRole: builder.mutation<IEmployee, { id: string, role: string }>({
      query: ({ id, role }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: { role },
      }),
      transformResponse: (response: IEmployee) => response,
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          dispatch(employeeApi.util.invalidateTags([{ type: 'Employee' }]));
        } catch (error) {
          console.error('Error updating employee role:', error);
        }
      },
    }),
  }),
});

export const { useGetEmployeesQuery, useUpdateEmployeeRoleMutation } = employeeApi;
