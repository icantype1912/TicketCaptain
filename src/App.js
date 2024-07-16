import React from "react"
import { Route,Routes,BrowserRouter,Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import { NavLink } from "./components/NavLink";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";


const App = ()=>{
  return<>
    <BrowserRouter>
    <NavLink/>
        <Routes>
            <Route path="/" element={<Landing/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/main" element={<Main/>}></Route>
            <Route path="*" element={<Navigate to ="/"/>}></Route>
        </Routes>
    </BrowserRouter>
  </>
}

export default App