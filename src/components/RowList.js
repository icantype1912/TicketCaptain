import { Draggable } from "react-beautiful-dnd";
import { Button } from "@mui/material";
import { Row } from "./Row";
import { useState } from "react";
import { CreateIssue } from "./CreateIssue";

export const RowList = (props) => {
  const { provided, tasks, column, setData, data } = props;
  const [isAdding, setIsAdding] = useState(false);
  const handleAdd = () => {
    setIsAdding(true);
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
            {(provided) => (
              <Row
                provided={provided}
                task={task}
                setData={setData}
                data={data}
                column={column}
              />
            )}
          </Draggable>
        );
      })}
      {provided.placeholder}
      <div>
        <Button
          onClick={handleAdd}
          sx={{
            color: "#023d8a",
            textTransform: "none",
            display: "flex",
            justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "rgba(0, 181, 284,0.2)",
            },
          }}
        >
          + Create issue
        </Button>
      </div>
      <CreateIssue
        data={data}
        column={column}
        setData={setData}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
      />
    </div>
  );
};
