import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Modal,
  Box,
  TextField,
  Chip,
  Paper,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel
} from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";

export const Row = (props) => {
  const { provided, task, setData, data, column } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [err, setErr] = useState("");
  const [newTask, setNewTask] = useState(task.content);
  const [newDescription, setNewDescription] = useState(task.description);
  const [chips, setChips] = React.useState(task.tags);


  const handleChange = (newChips) => {
    setChips(newChips);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const onEditCancel = () => {
    setNewTask(task.content);
    setNewDescription(task.description);
    setIsEditing(false);
    setChips(task.tags);
    setErr("");
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
    setData((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [task.id]:{
          ...prev.tasks[task.id],
          content:newTask,
          description:newDescription,
          tags:chips
        }

      },
    }));
    setIsEditing(false);
    setErr("");
    handleClose()
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteDialogOpen = () => {
    setDeleteConfirm(true);
  };
  const handleDeleteDialogClose = () => {
    setDeleteConfirm(false);
  };

  const deleteIssue = () => {
    const newTaskIDs = data.columns[column.id].taskIds.filter((x) => {
      return x !== task.id;
    });
    const { [task.id]: removedTask, ...newTasks } = data.tasks;

    setData((prev)=>({
      ...prev,
      tasks:newTasks,
      columns:{
        ...prev.columns,
        [column.id]:{
          ...prev.columns[column.id],
          taskIds : newTaskIDs
        }
      }
    }))
  };
  return (
    <div
      className="row"
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <h1 className="text-blue-100 flex justify-between items-center text-lg ml-1">
        {task.content}
        <Button
          onClick={(e) => {
            handleClick(e);
          }}
          sx={{
            color: "#CAF0F8",
            width: 25,
            height: 25,
            borderRadius: "50%",
            minWidth: 0,
            padding: 0,
            marginLeft: 1,
          }}
        >
          <MoreHorizIcon sx={{ fontSize: 25 }} />
        </Button>
      </h1>
      <div className="m-2 text-sm">
        <h1 className="text-blue-900">{task.description}</h1>
      </div>
      <Paper
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "start",
          flexWrap: "wrap",
          listStyle: "none",
          height: "auto",
          backgroundColor: "transparent",
          boxShadow: "none",
          p: 0.5,
          mt: 1,
        }}
        component="ul"
      >
        {task.tags.map((tag) => {
          return (
            <li key={tag.id}>
              <Chip
                size="small"
                label={tag}
                sx={{ color: "#caf0f8", backgroundColor: "#023e8a4d" }}
              />
            </li>
          );
        })}
      </Paper>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteDialogOpen} sx={{ color: "red" }}>
          Delete
        </MenuItem>
      </Menu>
      <Dialog
        open={deleteConfirm}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{"Confirm Change"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this issue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            sx={{ textTransform: "none" }}
            onClick={handleDeleteDialogClose}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{
              textTransform: "none",
            }}
            autoFocus
            onClick={deleteIssue}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
                }}
                autoFocus
                onClick={onEditConfirm}
              >
                Confirm
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
