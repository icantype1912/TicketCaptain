import React from "react";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const Login =()=>{
    return<div className="table">
        <div className="flex justify-center w-full mt-6 ">
            <h1 className="text-blue-900 text-3xl">Login</h1>
        </div>
        <div className="flex flex-col gap-4 w-full items-center mt-6">
            <TextField className = "w-11/12" label="Username" variant="outlined"/>
            <TextField className = "w-11/12" label="Password" variant="outlined" type="password"/>
        </div>
        <div className="flex flex-col items-center text-blue-800 mt-8">
            <h1 className="mb-4">Don't have an account?<Link to="/signup"> SignUp!</Link></h1>
            <Button variant = "contained" sx={{ backgroundColor:'#0077b6',color:'#caf0f8',mt:'1ch',width:'92%',height:'6ch'}}>Login</Button>
        </div>
    </div>
}

export default Login