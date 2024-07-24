import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { validateEmail } from "../utilities/validations";

export const ColabModal = (props) => {
  const { openColab, setOpenColab } = props;
  const [email, setEmail] = useState("");
  const [emailValidity, setEmailValidity] = useState("");
  const [status,setStatus] = useState("")

  const collaborate = async () => {
    setEmailValidity("")
    if (!validateEmail(email)) {
      setEmailValidity("Please enter a valid email");
      return;
    }
    setStatus("This feature has not been completed due to a lazy dev")
  };

  const handleCloseColab = () => {
    setOpenColab(false);
    setEmail("")
    setEmailValidity("")
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
          <form className="flex">
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
            </Button>
          </form>
          <h1 className="text-error text-center">{status}</h1>
          <div className="flex justify-end">
            <Button onClick={handleCloseColab}>Close</Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
