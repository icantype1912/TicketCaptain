import React, { useState } from "react";
import { Modal, Box, TextField, InputLabel, Button } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import { nanoid } from "nanoid";

export const CreateIssue = (props) => {
  const { data, column, setData,isAdding,setIsAdding } = props;
  const [err, setErr] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [chips, setChips] = React.useState([]);

  const handleChange = (newChips) => {
    setChips(newChips);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    onAddConfirm();
  };

  const onAddCancel = () => {
    setNewTask("");
    setNewDescription("");
    setIsAdding(false);
    setChips([]);
    setErr("");
  };

  const onAddConfirm = () => {
    if (newTask.length < 1) {
      setErr("*Required");
      return;
    }
    const newTaskId = nanoid();
    const addedTask = {
      id: newTaskId,
      content: newTask,
      description: newDescription,
      tags: chips,
    };
    const newTaskArr = [...data.columns[column.id].taskIds, newTaskId];
    setData((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [newTaskId]: addedTask,
      },
      columns: {
        ...prev.columns,
        [column.id]: {
          ...prev.columns[column.id],
          taskIds: newTaskArr,
        },
      },
    }));
    setNewTask("");
    setNewDescription("");
    setChips([]);
    setIsAdding(false);
    setErr("");
  };
  return (
    <Modal
      open={isAdding}
      onClose={onAddCancel}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
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
        <form className="flex flex-col gap-4 " onSubmit={handleTaskSubmit}>
          <h1 className="text-blue-800 text-xl">Create Issue</h1>
          <TextField
            label="Title"
            size="small"
            helperText={err}
            error={err}
            value={newTask}
            autoFocus
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
          />
          <TextField
            label="Description"
            size="small"
            multiline
            rows={4}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            <InputLabel>Tags</InputLabel>
            <MuiChipsInput value={chips} onChange={handleChange} />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              sx={{ color: "#001865", textTransform: "none" }}
              onClick={onAddCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#00077B6",
                textTransform: "none",
              }}
              onClick={onAddConfirm}
            >
              Confirm
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
