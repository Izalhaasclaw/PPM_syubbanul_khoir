import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../store/AuthStore";

export default function RouteGuard(){
    const isAunthenticated = authStore((state) => state.isAuthenticated)

    if(!isAunthenticated){
        return <Navigate to="/Login-Form" replace />
    }
    return <Outlet/>;

}