import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export const useAuthContext=()=>{
    const context=useContext(AuthContext);
    if(!context){
        throw Error('UseAuthContext must be be used inside an AuthContextProvider')
    }
    return context
}