import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";


const Landing = ()=>{
    const navigate = useNavigate()
    return<div className="mt-24 ml-12 flex flex-col gap-3">
        <h2 className="text-3xl text-blue-900 mb-3">TicketCaptain</h2>
        <h1 className="text-6xl text-blue-900">Mazimize your team's productivity</h1>
        <h3 className="text-2xl text-blue-900">Keep your tasks organized and your productivity up</h3>
        <div className="mt-6 flex gap-5">
            <Button  onClick = {()=>{navigate("/signup")}} variant="outlined" sx={{textTransform:'none', color:'#023e8a',borderColor:'#023e8a'}}>Sign Up</Button>
            <Button variant="outlined" sx={{textTransform:'none', color:'#023e8a',borderColor:'#023e8a'}}>Learn more</Button>
        </div>
    </div>
}

export default Landing