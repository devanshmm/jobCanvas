
import type { JSX } from "react"
import { Navigate } from "react-router-dom";

interface props {
    children: JSX.Element;
}
export const ProtectedRout = ({ children }: props): JSX.Element => {
    const token = localStorage.getItem('token');

    if(!token){
        return< Navigate to= '/signin' replace/>
    }
    return children;
}