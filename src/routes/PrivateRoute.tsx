import {FC} from "react";
import {Navigate} from "react-router-dom";
import {selectIsAuth} from "../redux/slices/authSlice";
import {useSelector} from "react-redux";

type Props = {
    children: any
}

export const PrivateRoute: FC<Props> = ({children}: Props) => {

     const isAuth = useSelector(selectIsAuth)

    return isAuth
        ? children
        : <Navigate to="/" />

}

export default PrivateRoute
