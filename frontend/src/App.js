import React from "react";
import './index.css'; // or './tailwind.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Payment from "./pages/payement/components/Payment";
import VideoChat from "./pages/Consult/VideoChat";
import Dashboard from "./pages/Dashboard/Dashboard";
import Booking from "./pages/Booking/Booking";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/patient" element={<Booking />} />
      <Route path='/payment' element={<Payment />} />
      <Route path="/videoChat" element={<VideoChat />} />
      {/* <Route path="/consult" element={<Consult/>}></Route> */}
    </Routes>
  );
}

export default App;
