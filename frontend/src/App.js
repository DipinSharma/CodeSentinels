import React from "react";
import './index.css'; // or './tailwind.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Payment from "./pages/payement/components/Payment";
import VideoChat from "./pages/Consult/VideoChat";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Booking from "./pages/Booking/Booking";
import AccountType from "./pages/Signup/components/AccountType";
import DoctorForm from "./pages/Signup/components/DoctorForm";
import UserForm from "./pages/Signup/components/UserForm";

function App() {
  return (
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/payment' element={<Payment/>} />
            <Route path="/videoChat" element={<VideoChat/>}/>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/patient" element={<Booking />} />
            <Route path="/accounttype" element={<AccountType></AccountType>}></Route>
            <Route path="/doctor" element={<DoctorForm></DoctorForm>}></Route>
            <Route path="/signup" element={<UserForm></UserForm>}></Route>
            {/* <Route path="/consult" element={<Consult/>}></Route> */}
          </Routes>

  );
}

export default App;
