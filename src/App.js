import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { NavBar } from "./components/NavBar.js";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "./utilities/firebaseconfig.js";

const firebaseConfig = {
  apiKey:API_KEY,
  authDomain:AUTH_DOMAIN,
  projectId:PROJECT_ID,
  storageBucket:STORAGE_BUCKET,
  messagingSenderId:MESSAGING_SENDER_ID,
  appId:APP_ID,
  measurementId:MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      try {
        let localUser = JSON.parse(storedUser);
        setUser(localUser);
      } catch (error) {
        console.error("Failed to parse");
      }
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      window.localStorage.setItem("user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("user");
    }
  }, [user]);
  return (
    <>
      <BrowserRouter>
        <NavBar auth={auth} user={user} setUser={setUser} />
        {user === null ? (
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route
              path="/login"
              element={<Login auth={auth} setUser={setUser} />}
            ></Route>
            <Route
              path="/signup"
              element={<SignUp auth={auth} db={db} setUser={setUser} />}
            ></Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Main db={db} />}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
