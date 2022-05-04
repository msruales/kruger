import {Route, Routes} from "react-router-dom";
import Login from "../pages/Auth/Login/Login";
import DashboardRoutes from "./DashboardRoutes";
import PrivateRoute from "./PrivateRoute";
import {useReloadUserQuery} from "../pages/Auth/service/authApi";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, setCredentials} from "../redux/slices/authSlice";
import {Progress} from "@chakra-ui/react";
import PublicRoute from "./PublicRoute";
import {useEffect, useState} from "react";
export const AppRouter = () => {

    const  reloadUser = !Boolean(localStorage.getItem('userId'))
    const {data, isError} = useReloadUserQuery(String(localStorage.getItem('token')), {skip: reloadUser });
    const dispatch = useDispatch()
    const [ checking, setChecking ] = useState(true)

    useEffect(()=>{

        if(reloadUser){
            setChecking(false)
        }

        if (data?.token) {
            dispatch(setCredentials({token: data.token, user: data.user}))
            setChecking(false)
        }
        if(isError){
            setChecking(false)
        }

    },[data,reloadUser,isError])


    if (checking) {
        return (<Progress size='xs' isIndeterminate />)
    }

    return (
        <div>
            <Routes>

                <Route path="/" element={
                    <PublicRoute>
                        <Login/>
                    </PublicRoute>
                }/>

                <Route path="/*" element={
                    <PrivateRoute>
                        <DashboardRoutes/>
                    </PrivateRoute>
                }/>
            </Routes>
        </div>
    )
}

export default AppRouter