import React from "react";
import './index.css'; // or './tailwind.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Payment from "./pages/payement/components/Payment";
import VideoChat from "./pages/Consult/VideoChat";
import Dashboard from "./pages/Dashboard/Dashboard";
import Booking from "./pages/Booking/Booking";
import DoctorForm from "./pages/Signup/components/SignUpDoctor";
import UserSessions from "./pages/Session/components/UserSessions";
// import Signup from "./pages/Signup/Signup";
import UserLogin from "./pages/Login/components/UserLogin"
import DoctorLogin from "./pages/Login/components/DoctorLogin";
import SignUpDoctor from "./pages/Signup/components/SignUpDoctor";
import SignUpUser from "./pages/Signup/components/SignUpUser";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/payment' element={<Payment />} />
      <Route path="/videoChat" element={<VideoChat />} />
      <Route path="/login/patient" element={<UserLogin />}></Route>
      <Route path="/login/doctor" element={<DoctorLogin />}></Route>
      <Route path="/patient/dashboard" element={<Dashboard />} />
      <Route path="/doctor/dashboard" element={<Dashboard />} />
      <Route path="/patient/dashboard/booking" element={<Booking />} />
      <Route path="/signUp/patient" element={<SignUpUser/>}></Route>
      <Route path="/signUp/doctor" element={<SignUpDoctor />}></Route>
      <Route path='/sessions' element={<UserSessions />} />

      {/* <Route path="/consult" element={<Consult/>}></Route> */}
    </Routes>

  );
}

export default App;
