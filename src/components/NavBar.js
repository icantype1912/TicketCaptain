import React from "react";
import "../App.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export const NavBar = (props) => {
  const { user, setUser,auth } = props;
  const navigate = useNavigate();
  const onLogout = async()=>{
    try {
        await signOut(auth);
        setUser(null);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
  }
  return (
    <div className="Navlink">
      <div className="mt-3">
        <h1 className="text-blue-100 text-2xl ml-3">TicketCaptain</h1>
      </div>
      <div className="mt-3 mr-3">
        {user === null ? (
          <Button
            onClick={() => {
              navigate("/login");
            }}
            sx={{ color: "#caf0f8", textTransform: "none" }}
          >
            Login
          </Button>
        ) : (
          <Button
            onClick={onLogout}
            sx={{ color: "#caf0f8", textTransform: "none" }}
          >Logout</Button>
        )}
        <Button
          onClick={() => {
            navigate("/");
          }}
          sx={{ color: "#caf0f8", textTransform: "none" }}
        >
          About us
        </Button>
      </div>
    </div>
  );
};
