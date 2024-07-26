import React, { useEffect, useState } from "react";
import { Modal, Box, Button,Select,MenuItem } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";

export const BoardListModal = (props) => {
  const { openBoardList, setOpenBoardList, setBoardId, db, user } = props;
  const [boardList, setBoardList] = useState({});
  const [selectedBoard,setSelectedBoard] = useState()

  const handleSelectedBoardChange = (e)=>{
    setSelectedBoard(e.target.value)
  }
  const handleCloseBoardList = () => {
    setOpenBoardList(false);
  };
  const handleConfirm = ()=>{
    console.log(selectedBoard)
    setBoardId(selectedBoard)
    handleCloseBoardList()
  }
  const retrieveList = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("Name", "==", user.username)
      );
      const querySnapshot = await getDocs(q);

      let sharedBoards = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        sharedBoards = { ...sharedBoards, ...data.sharedBoards };
      });
      setBoardList(sharedBoards);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    retrieveList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Modal
      open={openBoardList}
      onClose={handleCloseBoardList}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      disableAutoFocus
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
          <div>
            <h1 className="text-xl text-blue-900">Choose board</h1>
          </div>
          <div className="flex flex-col">
            <Select value={selectedBoard} onChange={handleSelectedBoardChange}>
              {
                Object.keys(boardList).map((key)=>{
                  return <MenuItem key={boardList[key]} value={boardList[key]}>{key}</MenuItem>
                })
              }
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button color="inherit" sx={{ textTransform: "none" }} onClick={handleCloseBoardList}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
              }}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
