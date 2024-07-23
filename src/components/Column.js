import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import { RowList } from "./RowList";

export const Column = (props) => {
  const { column, tasks, index, setData, data } = props;
  const [titleChange, setTitleChange] = useState(column.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const onEditConfirm = () => {
    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [column.id]: {
          ...prev.columns[column.id],
          title: titleChange,
        },
      },
    }));
    setIsEditing(false);
  };
  const onEditCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditConfirm();
  };
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="column"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {isEditing ? (
            <form
              {...provided.dragHandleProps}
              className="flex items-end"
              onSubmit={handleSubmit}
            >
              <TextField
                defaultValue={column.title}
                onChange={(e) => {
                  setTitleChange(e.target.value);
                }}
                size="small"
                variant="standard"
                sx={{ marginBottom: 1, marginTop: 1, marginLeft: 1 }}
              />
              <Button
                onClick={onEditConfirm}
                sx={{
                  color: "#023E8A",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  minWidth: 0,
                  padding: 0,
                  marginLeft: 1,
                }}
              >
                <DoneIcon sx={{ fontSize: 15 }} />{" "}
              </Button>
              <Button
                sx={{
                  color: "#023E8A",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  minWidth: 0,
                  padding: 0,
                  marginLeft: 1,
                }}
                onClick={onEditCancel}
              >
                <CloseIcon sx={{ fontSize: 15 }} />{" "}
              </Button>
            </form>
          ) : (
            <div className="flex items-center" 
            {...provided.dragHandleProps}>
              <h1
                className="ml-4 text-xl text-blue-900"
              >
                {column.title}
              </h1>
              <Button
                sx={{
                  color: "#023E8A",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  minWidth: 0,
                  padding: 0,
                  marginLeft: 1,
                }}
                onClick={handleEdit}
              >
                <EditIcon sx={{ fontSize: 15 }} />{" "}
              </Button>
            </div>
          )}
          <Droppable droppableId={column.id} type="tasks">
            {(provided) => (
              <RowList
                provided={provided}
                tasks={tasks}
                column={column}
                data={data}
                setData={setData}
              />
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
