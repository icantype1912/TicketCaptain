import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

export const Column = (props) => {
  const { column, tasks } = props;
  return (
    <div className="column">
      <h1 className="text-center text-xl text-blue-900 mb-4">{column.title}</h1>
      <Droppable droppableId={column.id}>
        {(provided,snapshot) => (
          <div
            className="flex gap-2 flex-col h-5/6 "
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => {
              return (
                <Draggable  key= {task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      className="border-2 p-2 rounded-sm bg-blue-200"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <h1 className="text-blue-900">{task.content}</h1>
                    </div>
                  )}
                </Draggable>  
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
