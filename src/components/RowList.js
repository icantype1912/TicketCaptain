import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Button,
  TextField,
  Box,
  Modal,
} from "@mui/material";
import { Row } from "./Row";

export const RowList = (props) => {
  const { provided, tasks, column, setData, data } = props;

  const [err, setErr] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTags, setNewTags] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    onAddConfirm();
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const onAddCancel = () => {
    setNewTask("");
    setNewDescription("");
    setNewTags([]);
    setIsAdding(false);
    setErr("");
  };

  const onAddConfirm = () => {
    if (newTask.length < 1) {
      setErr("*required");
      return;
    }
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const addedTask = {
      id: newTaskId,
      content: newTask,
      description: newDescription,
      tags: newTags,
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
    setNewTags([]);
    setIsAdding(false);
    setErr("");
  };


  return (
    <div
      className="row-list"
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      {tasks.map((task, index) => {
        return (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => <Row provided={provided} task={task} data={data} />}
          </Draggable>
        );
      })}
      {provided.placeholder}
      <Button
        onClick={handleAdd}
        sx={{
          color: "#023d8a",
          textTransform: "none",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        + Create issue
      </Button>
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
              error={!!err}
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
                }}
                autoFocus
                onClick={onAddConfirm}
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
