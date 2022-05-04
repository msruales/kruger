import {createApi} from "@reduxjs/toolkit/query/react";
import {MyFetchBaseQuery} from "../helpers/MyfetchBaseQuery";
import {employeeAdapter} from "../pages/Admin/employee.adapter";
import {Employee, RegisterEmployee, UpdateEmployee} from "../pages/Admin/models/employee";

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: MyFetchBaseQuery(),
    tagTypes: ['Employee'],
    endpoints: builder => ({
        getEmployees: builder.query<any, any>({
            query: () => ({
                url: 'users',
                method: 'GET'
                // params:
            }),
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({ id }: any) => ({ type: 'Posts', id } as const)),
                        { type: 'Employee', id: 'LIST' },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{ type: 'Employee', id: 'LIST' }],


            transformResponse: (employees: Employee[]): Employee[] => {
                return employees.map(employee => employeeAdapter(employee))
            },
        }),
        register: builder.mutation<any , RegisterEmployee>({
            query: (employeeData:RegisterEmployee) => ({
                url: 'register',
                method: 'POST',
                body: {...employeeData, password: "12345678"}
            }),
            transformResponse: (employee: any) => {
                const employeeAdapted = employeeAdapter(employee);
                return {...employeeAdapted}
            },
            invalidatesTags: ['Employee']
        }),
        update: builder.mutation<any , UpdateEmployee>({
            query: ({id, ...rest}:UpdateEmployee) => ({
                url: 'users',
                method: 'POST',
                body: {...rest},
                params: { id }
            }),
            transformResponse: (employee: any) => {
                const employeeAdapted = employeeAdapter(employee);
                return {...employeeAdapted}
            },
            invalidatesTags: ['Employee']

        }),
    }),
})

export const {useGetEmployeesQuery, useRegisterMutation, useUpdateMutation } = employeeApi
