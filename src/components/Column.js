import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TextField from "@mui/material/TextField";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

export const Column = (props) => {
  const { column, tasks, index } = props;
  const [title, setTitle] = useState(column.title);
  const [changing,setChanging] = useState(column.title)
  const [isEditing, setIsEditing] = useState(false);
  

  const handleEdit = () => {
    setIsEditing(true);
  };
  const onEditConfirm = ()=>{
    setTitle(changing)
    setIsEditing(false)
  }
  const onEditCancel = ()=>{
    setChanging(title)
    setIsEditing(false)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    onEditConfirm()
  }
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="column"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {isEditing ? (
            <form {...provided.dragHandleProps} className="flex items-end" onSubmit={handleSubmit}>
              <TextField
                defaultValue={title}
                onChange={(e)=>{setChanging(e.target.value)}}
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
            <h1
              className="ml-4 text-xl text-blue-900 mb-4"
              {...provided.dragHandleProps}
            >
              {title}

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
            </h1>
          )}
          <Droppable droppableId={column.id} type="tasks">
            {(provided) => (
              <div
                className="row-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task, index) => {
                  return (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="row"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <h1 className="text-blue-100 flex justify-between items-center">
                            {task.content}
                            <Button
                              sx={{
                                color: "#CAF0F8",
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                minWidth: 0,
                                padding: 0,
                                marginLeft: 1,
                              }}
                            >
                              <MoreHorizIcon sx={{ fontSize: 20 }} />
                            </Button>
                          </h1>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
                <Button
                  sx={{
                    color: "#023d8a",
                    textTransform: "none",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  + Add a task
                </Button>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
