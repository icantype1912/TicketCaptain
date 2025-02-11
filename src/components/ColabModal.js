import React, { useState } from "react";
import { Modal, Box, TextField, Button,CircularProgress } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { validateEmail } from "../utilities/validations";
import {
  collection,
  getDocs,
  where,
  updateDoc,
  doc,
  query,
} from "firebase/firestore";

export const ColabModal = (props) => {
  const { openColab, setOpenColab, db, user } = props;
  const [email, setEmail] = useState("");
  const [emailValidity, setEmailValidity] = useState("");
  const [status, setStatus] = useState({ error: true, message: "" });
  const [loading,setLoading] = useState(false)

  const collaborate = async () => {
    try {
      setLoading(true)
      let boardId = "";
      let sharedBoards = {};
      let docId;
      setStatus({ error: true, message: "" });
      setEmailValidity("");

      if (!validateEmail(email)) {
        setEmailValidity("Please enter a valid email");
        return;
      }

      if (email === user.email) {
        setStatus({
          error: true,
          message: "You can't collaborate with yourself",
        });
        return;
      }

      const theirQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(theirQuery);

      if (querySnapshot.empty) {
        setStatus({
          error: true,
          message: "This mail address is not registered with our database",
        });
        return;
      } else {
        const docSnapshot = querySnapshot.docs[0];
        docId = docSnapshot.id;
        const docData = docSnapshot.data();
        sharedBoards = docData.sharedBoards || {};
      }
      const myQuery = query(
        collection(db, "users"),
        where("Name", "==", user.username)
      );
      const snapshot = await getDocs(myQuery);

      if (!snapshot.empty) {
        const docSnapshot = snapshot.docs[0];
        const docData = docSnapshot.data();
        boardId = docData.boardId;
      }

      const newSharedBoards = { ...sharedBoards, [user.username]: boardId };
      const userDocRef = doc(db, "users", docId);
      await updateDoc(userDocRef, { sharedBoards: newSharedBoards });
      setStatus({ error: false, message: "Collaboration successful!" });
      setEmail("")
    } catch (error) {
      console.error(error);
      setStatus({
        error: true,
        message: "An error occurred during collaboration",
      });
    }
    finally{
      setLoading(false)
    }
  };
  const handleSubmit = (e)=>{
    e.preventDefault()
    collaborate()
  }
  const handleCloseColab = () => {
    setOpenColab(false);
    setEmail("");
    setEmailValidity("");
    setStatus({ error: true, message: "" });
  };
  return (
    <Modal
      open={openColab}
      onClose={handleCloseColab}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "#CAF0F8",
          border: "1px solid #000",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}
      >
        <div className="flex flex-col gap-5">
          <h1 className="text-blue-900">Invite</h1>
          <form className="flex items-start" onSubmit={handleSubmit}>
            <TextField
              autoFocus
              label="Email"
              size="small"
              sx={{ width: 400 }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              helperText={emailValidity}
              error={emailValidity}
            />
            {!loading?
            <Button
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                minWidth: 0,
                marginLeft: 1,
              }}
              onClick={collaborate}
            >
              <PersonAddIcon sx={{ font: 25 }} />
            </Button>:<CircularProgress sx={{marginLeft:2,marginTop:0.8}} size={25}/>}
          </form>
          {status.error ? (
            <h1 className="text-error text-center">{status.message}</h1>
          ) : (
            <h1 className="text-green text-center">{status.message}</h1>
          )}
          <div className="flex justify-end">
            <Button onClick={handleCloseColab}>Close</Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};