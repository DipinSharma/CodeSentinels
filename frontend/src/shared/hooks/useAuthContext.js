import { useContext } from "react";
import { AuthContext } from "../context/authContext";
export const useAuthContext=()=>{
    const context=useContext(AuthContext);
    if(!context){
        throw Error('UseAuthContext must be be used inside an AuthContextProvider')
    }
    return context
}