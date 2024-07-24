import React, { useState } from "react";
import { Modal, Box, TextField, InputLabel, Button,Select,MenuItem } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";

export const EditModal = (props) => {
  const { task,handleClose,isEditing,setIsEditing,setData,data,column } = props;

  const [err, setErr] = useState("");
  const [newTask, setNewTask] = useState(task.content);
  const [newDescription, setNewDescription] = useState(task.description);
  const [chips, setChips] = React.useState(task.tags);
  const [newIssueColumn, setNewIssueColumn] = useState(column.id);

  const handleChange = (newChips) => {
    setChips(newChips);
  };

  const handleColumnChange = (e) => {
    setNewIssueColumn(e.target.value);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    onEditConfirm();
  };

  const onEditConfirm = () => {
    if (newTask.length < 1) {
      setErr("*Required");
      return;
    }

    setData((prev) => {
      const updatedTasks = {
        ...prev.tasks,
        [task.id]: {
          ...prev.tasks[task.id],
          content: newTask,
          description: newDescription,
          tags: chips,
        },
      };

      let updatedColumns = { ...prev.columns };

      if (newIssueColumn !== column.id) {
        updatedColumns = {
          ...prev.columns,
          [column.id]: {
            ...prev.columns[column.id],
            taskIds: prev.columns[column.id].taskIds.filter(id => id !== task.id),
          },
          [newIssueColumn]: {
            ...prev.columns[newIssueColumn],
            taskIds: [...prev.columns[newIssueColumn].taskIds, task.id],
          },
        };
      }

      return {
        ...prev,
        tasks: updatedTasks,
        columns: updatedColumns,
      };
    });

    setIsEditing(false);
    setErr("");
    handleClose();
  };
  

  const onEditCancel = () => {
    setNewTask(task.content);
    setNewDescription(task.description);
    setIsEditing(false);
    setChips(task.tags);
    handleClose();
    setErr("");
  };
  return (
    <Modal
      open={isEditing}
      onClose={onEditCancel}
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
          <h1 className="text-blue-800 text-xl">Edit Issue</h1>
          <TextField
            autoFocus
            label="Title"
            size="small"
            helperText={err}
            error={err}
            value={newTask}
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
          <div className="flex flex-col">
            <InputLabel>Column</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newIssueColumn}
              onChange={handleColumnChange}
            >
              {data.columnOrder.map((columnId) => (
                <MenuItem key={columnId} value={columnId}>
                  {data.columns[columnId].title}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <InputLabel>Tags</InputLabel>
            <MuiChipsInput value={chips} onChange={handleChange} />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              sx={{ color: "#001865", textTransform: "none" }}
              onClick={onEditCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#00077B6",
                textTransform: "none",
              }}
              onClick={onEditConfirm}
            >
              Confirm
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
