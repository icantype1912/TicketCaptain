import React from "react";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const SignUp =()=>{
    return<div className="table">
        <div className="flex justify-center w-full mt-4 ">
            <h1 className="text-blue-900 text-3xl">SignUp</h1>
        </div>
        <div className="flex flex-col gap-4 w-full items-center mt-2">
            <TextField className = "w-11/12" label="Email" variant="outlined" size="small"/>
            <TextField className = "w-11/12" label="Username" variant="outlined" size="small"/>
            <TextField className = "w-11/12" label="Set Password" variant="outlined" size="small" />
            <TextField className = "w-11/12" label="Confirm Password" variant="outlined" type="password" size="small"/>
        </div>
        <div className="flex flex-col items-center text-blue-800 mt-4">
            <h1 className="mb-4">Already have an account?<Link to="/login">Login</Link></h1>
            <Button variant = "contained" sx={{ backgroundColor:'#0077b6',color:'#caf0f8',width:'92%',height:'5ch'}}>Login</Button>
        </div>
    </div>
}

export default SignUp