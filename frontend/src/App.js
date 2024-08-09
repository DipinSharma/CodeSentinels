import React from "react";
import './index.css'; // or './tailwind.css'

import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./pages/Home";
import VideoChat from "./pages/VideoChat";
function App() {
  return (<>
    
      <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/videoChat" element={<VideoChat></VideoChat>}></Route>
      </Routes>
    
  </>);
}

export default App;
