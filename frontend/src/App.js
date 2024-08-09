import React from "react";
import './index.css'; // or './tailwind.css'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Payment from "./pages/payement/components/Payment";
import VideoChat from "./pages/Consult/VideoChat";

function App() {
  return (
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/payment' element={<Payment/>} />
            <Route path="/videoChat" element={<VideoChat/>}/>
            {/* <Route path="/consult" element={<Consult/>}></Route> */}
          </Routes>
  );
}

export default App;
