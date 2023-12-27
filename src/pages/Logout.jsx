import { useEffect } from "react"
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Logout = () => {
    const {LogoutUser} = useAuth();
    console.log("isLoggedIn", LogoutUser)

    useEffect(() => {
        LogoutUser();
    }, [LogoutUser])
    return <>
        <Navigate to={"/login"}/>
    </>
}