import { createContext,useEffect,useReducer } from "react";

export const AuthContext=createContext();

export const authReducer=(state,action)=>{
    switch(action.type){
        case 'LOGIN_USER':
            return {user:action.payload};
        case 'LOGOUT_USER':
            return {user:null};
        case 'LOGIN_DOCTOR':
            return {doctor:action.payload};
        case 'LOGOUT_DOCTOR':
            return {doctor:null};
        default:
            return state;
    }
}
export const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(authReducer,{
        user:null,doctor:null
    })
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        const doctor=JSON.parse(localStorage.getItem('doctor'));
        if(user){
            dispatch({type:'LOGIN_USER',payload:user});
        }
        if(doctor){
            dispatch({type:'LOGIN_DOCTOR',payload:doctor});
        }

    },[]);
    console.log("AuthContext state ",state);
    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}