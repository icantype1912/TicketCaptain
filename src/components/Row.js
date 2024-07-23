import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
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
} from "@mui/material";

import { EditIssue } from "./EditIssue";

export const Row = (props) => {
  const { provided, task, setData, data, column } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
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

    setData((prev) => ({
      ...prev,
      tasks: newTasks,
      columns: {
        ...prev.columns,
        [column.id]: {
          ...prev.columns[column.id],
          taskIds: newTaskIDs,
        },
      },
    }));
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
            padding: 1,
            marginLeft: 1,
          }}
        >
          <MoreHorizIcon sx={{ fontSize: 22 }} />
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
        disableAutoFocusItem
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
            onClick={deleteIssue}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <EditIssue
        task={task}
        handleClose={handleClose}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setData={setData}
        data = {data}
        column = {column}
      />
    </div>
  );
};
