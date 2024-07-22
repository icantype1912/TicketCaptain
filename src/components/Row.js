import { Button } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

export const Row = (props) => {
  const { provided, task, data } = props;
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
      <div className="m-2 text-sm">
        <h1 className="text-blue-950">{task.description}</h1>
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
        {task.tags.map((tagId) => {
          const tag = data.tags[tagId];
          return (
            <li key={tag.id}>
              <Chip
                size="small"
                label={tag.label}
                sx={{ color: "#caf0f8", backgroundColor: "#023e8a4d" }}
              />
            </li>
          );
        })}
      </Paper>
    </div>
  );
};
