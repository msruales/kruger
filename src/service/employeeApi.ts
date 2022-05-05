import {createApi} from "@reduxjs/toolkit/query/react";
import {MyFetchBaseQuery} from "../helpers/MyfetchBaseQuery";
import {employeeAdapter} from "../pages/Admin/employee.adapter";
import {Employee, RegisterEmployee, UpdateEmployee} from "../pages/Admin/models/employee";

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: MyFetchBaseQuery(),
    tagTypes: ['Employees'],
    endpoints: builder => ({
        getEmployees: builder.query<any, any>({
            query: () => ({
                url: 'users',
                method: 'GET'
            }),
            providesTags: (result) =>
                result
                    ?
                    [
                        ...result.map(({ id }: any) => ({ type: 'Employees', id } as const)),
                        { type: 'Employees', id: 'LIST' },
                    ]
                    :
                    [{ type: 'Employees', id: 'LIST' }],


            transformResponse: (employees: Employee[]): Employee[] => {
                return employees.map(employee => employeeAdapter(employee)).filter(employee => employee.rol!=="admin")
            },
        }),
        getEmployee: builder.query<any, any>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'GET'
            }),
            transformResponse: (employee: any): Employee[] => {
                return employee
            },
        }),
        register: builder.mutation<any , RegisterEmployee>({
            query: (employeeData:RegisterEmployee) => ({
                url: 'register',
                method: 'POST',
                body: {...employeeData, password: "12345678", rol: "employee"}
            }),
            transformResponse: (employee: any) => {
                const employeeAdapted = employeeAdapter(employee);
                return {...employeeAdapted}
            },
            invalidatesTags: [{ type: 'Employees', id: 'LIST' }],
        }),
        update: builder.mutation<any , UpdateEmployee>({
            query: ({id, ...rest}: UpdateEmployee) => ({
                url: `users/${id}`,
                method: 'PATCH',
                body: {...rest},
            }),
            invalidatesTags: ['Employees']

        }),
        delete: builder.mutation<any , any>({
            query: (id: string) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),

            invalidatesTags: (result, error, id) => [{ type: 'Employees', id }],

        }),
    }),
})

export const {useGetEmployeesQuery, useRegisterMutation, useUpdateMutation, useGetEmployeeQuery, useDeleteMutation } = employeeApi
