import React from "react";
import { useStateProvider } from "../../context/stateContext";
import DoctorForm from "./components/DoctorForm";
import UserForm from "./components/UserForm";

const Signup =() =>{
    const [{userType}]=useStateProvider();
    return (
        <>
            if(userType=="doctor"){
                <DoctorForm></DoctorForm>
            }else{
                <UserForm></UserForm>
            }
        </>
    )
}

export default Signup;