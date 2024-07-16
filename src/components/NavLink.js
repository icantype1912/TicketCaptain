import React from "react";
import "../App.css"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NavLink = ()=>{
    const navigate = useNavigate()
    return<div className="Navlink">
        <div className="mt-3">
            <h1 className="text-blue-100 text-2xl ml-3">TicketCaptain</h1>
        </div>
        <div className="mt-3 mr-3">
            <Button onClick = {()=>{navigate("/login")}} sx={{color:'#caf0f8',textTransform:'none'}}>Login</Button>
            <Button onClick = {()=>{navigate("/")}} sx={{color:'#caf0f8',textTransform:'none'}}>About us</Button>
        </div>
    </div>
}
