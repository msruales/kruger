import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../models/user";
import {RootState} from "../store";

type AuthState = {
    user: User | null,
    token: string | null,
}

const INITIAL_AUTH: AuthState = {
    user: null,
    token: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_AUTH,
    reducers: {
        setCredentials: (state, {payload: {user, token}}: PayloadAction<{ user: User; token: string }>) => {
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user.id);
            state.user = user
            state.token = token
        },
        setLogout: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            return  {...INITIAL_AUTH}
        },
    }
})

export const {setCredentials, setLogout} = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectIsAuth = (state: RootState) => !!(state.auth.user && state.auth.token)
export const selectUserRol = (state: RootState) => state.auth.user?.rol
