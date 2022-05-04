import {createApi} from "@reduxjs/toolkit/query/react";
import {LoginInterface, LoginResponse} from "../Login/models";
import {User} from "../../../models/user";
import {userAdapter} from "../Login/adapters/user.adapter";
import {MyFetchBaseQuery} from "../../../helpers/MyfetchBaseQuery";


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: MyFetchBaseQuery(),
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, LoginInterface>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials
            }),
            transformResponse: ({accessToken, user}: LoginResponse) => {
                const userAdapted = userAdapter(user);
                return {accessToken, user: userAdapted}
            },

        }),
        register: builder.mutation<LoginResponse, LoginInterface>({
            query: (credentials) => ({
                url: 'register',
                method: 'POST',
                body: credentials
            }),
            transformResponse: ({accessToken, user}: LoginResponse) => {
                const userAdapted = userAdapter(user);
                return {accessToken, user: userAdapted}
            },

        }),
        reloadUser: builder.query({
            query: (token:string) => ({
                url: `users/${String(localStorage.getItem('userId'))}`,
                headers:  new Headers(
                    {
                        'Authorization': 'Bearer ' + token,
                        'Accept': '*/*',
                    }),
            }),
            transformResponse: (user: User) => {
                const userAdapted = userAdapter(user);
                return {token: String(localStorage.getItem('token')), user: userAdapted}
            },
        })
    }),
})

export const {useLoginMutation, useReloadUserQuery } = authApi
