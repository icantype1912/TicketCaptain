import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { validateEmail, validatePassword } from "../utilities/validations";
import CircularProgress from "@mui/material/CircularProgress";

const SignUp = (props) => {
  const [loading, setLoading, ] = useState(false);
  const navigate = useNavigate();
  const { auth, db ,setUser} = props;
  const [fields, setFields] = useState({
    email: "",
    username: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirm: "",
    error: 0,
  });
  const [firebaseErr, setFirebaseErr] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addUser = async () => {
    try {
      await addDoc(collection(db, "users"), {
        Name: fields.username.toLowerCase(),
        email: fields.email.toLowerCase(),
        isActive: true,
        sharedBoards : {}
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setErrors((prev) => ({
      ...prev,
      error: 0,
    }));
    if (!validateEmail(fields.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Invalid Email",
        error: prev.error + 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
    if (fields.username.length < 5) {
      setErrors((prev) => ({
        ...prev,
        username: "Username must be atleast 5 charectars",
        error: prev.error + 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        username: "",
      }));
    }
    if (!validatePassword(fields.password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must contain atleast 8 charectars,1 uppercase,1 lowercase,1 digit and 1 symbol",
        error: prev.error + 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }
    if (fields.password !== fields.confirm) {
      setErrors((prev) => ({
        ...prev,
        confirm: "Passwords do not match",
        error: prev.error + 1,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        confirm: "",
      }));
    }
    if (errors.error > 0) {
      setLoading(false);
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        fields.email,
        fields.password
      );
      await updateProfile(auth.currentUser, {
        displayName: fields.username.toLowerCase(),
      });
      setUser({
        username: userCred.user.displayName,
        email: userCred.user.email,
      });
      addUser();
      navigate("/main");
    } catch (error) {
      console.error(error);
      if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setFirebaseErr("Email already in use");
            break;
          default:
            setFirebaseErr(error.code);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="flex justify-center w-full mt-4 ">
        <h1 className="text-blue-900 text-2xl">SignUp</h1>
      </div>
      <div className="flex flex-col gap-4 w-full items-center mt-1">
        <TextField
          error={errors.email}
          name="email"
          value={fields.email}
          className="w-11/12"
          label="Email"
          variant="outlined"
          size="small"
          onChange={handleChange}
          helperText={errors.email}
        />
        <TextField
          error={errors.username}
          name="username"
          value={fields.username}
          className="w-11/12"
          label="Username"
          variant="outlined"
          size="small"
          onChange={handleChange}
          helperText={errors.username}
        />
        <TextField
          error={errors.password}
          name="password"
          value={fields.password}
          className="w-11/12"
          label="Set Password"
          variant="outlined"
          size="small"
          type="password"
          onChange={handleChange}
          helperText={errors.password}
        />
        <TextField
          error={errors.confirm}
          name="confirm"
          value={fields.confirm}
          className="w-11/12"
          label="Confirm Password"
          variant="outlined"
          type="password"
          size="small"
          onChange={handleChange}
          helperText={errors.confirm}
        />
      </div>
      {errors.error ? (
        <></>
      ) : (
        <div>
          <h1 className="text-center text-error h-6">{firebaseErr}</h1>
        </div>
      )}
      <div className="flex flex-col items-center text-blue-800 pb-4">
        <h1 className="mb-2">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </h1>
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <Button
            variant="contained"
            onClick={handleSignUp}
            sx={{
              textTransform: "none",
              backgroundColor: "#0077b6",
              color: "#caf0f8",
              width: "92%",
              height: "5ch",
            }}
          >
            SignUp
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignUp;
