import React from "react";
import { useStateProvider } from "../../../context/stateContext";

const AccountType =() =>{
    const [{userType},dispatch] =useStateProvider()
    return (
        <>
            <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Are you a doctor or patient?
        <strong className="font-extrabold text-red-700 sm:block">  </strong>
      </h1>

      {/* <p className="mt-4 sm:text-xl/relaxed">
        Select your role below to proceed with the appropriate actions tailored for doctors or patients.
      </p> */}

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="/doctor"
          onClick={()=>{
            dispatch({
                type:"set_user_type",
                userType:"doctor"
            })
          }}
        >
          Doctor
        </a>

        <a
          className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="/signup"
          
          onClick={()=>{
            dispatch({
                type:"set_user_type",
                userType:"patient"
            })
          }}
        >
          Patient
        </a>
      </div>
    </div>
  </div>
</section>

        </>
    )
}

export default AccountType