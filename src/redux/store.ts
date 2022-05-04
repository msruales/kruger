import { configureStore } from '@reduxjs/toolkit'
import authSlice from "./slices/authSlice";
import {authApi} from "../pages/Auth/service/authApi";
import {employeeApi} from "../service/employeeApi";



export const store = configureStore({
    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            employeeApi.middleware,
            authApi.middleware,
        )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch