import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { NavLink } from "./components/NavLink";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";

const firebaseConfig = {
  apiKey: "AIzaSyCiKo-se_sSwCaD6NGf_tTnYf4t_oKIHLE",
  authDomain: "ticketcaptain-1c760.firebaseapp.com",
  projectId: "ticketcaptain-1c760",
  storageBucket: "ticketcaptain-1c760.appspot.com",
  messagingSenderId: "232530109892",
  appId: "1:232530109892:web:9aef8fb492fab97d137091",
  measurementId: "G-JE9GJ3302Y",
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
        setUser(JSON.parse(storedUser));
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
        <NavLink auth={auth} user={user} setUser={setUser} />
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
            <Route path="/" element={<Main />}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
