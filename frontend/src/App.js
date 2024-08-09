import React from "react";
import './index.css'; // or './tailwind.css'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from "./pages/Home";
import VideoChat from "./pages/VideoChat";
import Payment from "./components/Payment";

function App() {
  return (
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/payment' element={<Payment />} />
            <Route path="/videoChat" element={<VideoChat/>}/>
          </Routes>
  );
}

export default App;
