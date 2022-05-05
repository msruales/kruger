import {FC} from "react";
import {Navigate} from "react-router-dom";
import {selectIsAuth, selectUserRol} from "../redux/slices/authSlice";
import {useSelector} from "react-redux";

type Props = {
    children: any
}

export const PrivateRoute: FC<Props> = ({children}: Props) => {

    const isAuth = useSelector(selectIsAuth)
    const currentRol = useSelector(selectUserRol)
    return isAuth
        ? currentRol === "admin" ? <Navigate to="/admin"/> : <Navigate to="/employee"/>
        : children

}

export default PrivateRoute
