import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { validateEmail } from "../utilities/validations";
import CircularProgress from "@mui/material/CircularProgress";

const Login = (props) => {
  const { auth, setUser } = props;
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleLogin = async () => {
    setLoading(true);
    if (!validateEmail(fields.email)) {
      setEmailError("Invalid email");
      setLoading(false);
      return;
    } else {
      setEmailError("");
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        fields.email,
        fields.password
      );
      setUser({
        username: userCredential.user.displayName,
        email: userCredential.user.email,
      });
      navigate("/main");
    } catch (error) {
      if (error.code) {
        switch (error.code) {
          case "auth/invalid-credential":
            setFirebaseError("Your Username and Password do not match");
            break;
          case "auth/missing-password":
            setFirebaseError("Please enter your password");
            break;
          default:
            setFirebaseError(error.code);
        }
      }
      else{
        console.error(error)
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="table">
      <div className="flex justify-center w-full mt-6 ">
        <h1 className="text-blue-900 text-2xl">Login</h1>
      </div>
      <div className="flex flex-col gap-4 w-full items-center mt-6">
        <TextField
          error={emailError}
          helperText={emailError}
          onChange={handleChange}
          value={fields.email}
          name="email"
          className="w-11/12"
          label="Email"
          variant="outlined"
        />
        <TextField
          onChange={handleChange}
          value={fields.password}
          name="password"
          className="w-11/12"
          label="Password"
          variant="outlined"
          type="password"
        />
      </div>
      {emailError ? (
        <></>
      ) : (
        <div>
          <h1 className="text-error text-center">{firebaseError}</h1>
        </div>
      )}
      <div className="flex flex-col items-center text-blue-800 pb-4">
        <h1 className="mb-4">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            SignUp
          </Link>
        </h1>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            onClick={handleLogin}
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#0077b6",
              color: "#caf0f8",
              mt: "1ch",
              width: "92%",
              height: "6ch",
            }}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Login;
