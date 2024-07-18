import React, { useState } from "react";
import { initialData } from "../data";
import { Column } from "../components/Column";
import { DragDropContext } from "react-beautiful-dnd";

const Main = () => {
  const [data, setData] = useState(initialData);
  const dragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn,
        },
      }));
      return
    }

    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index,1);
    const newStart = {
        ...start,
        taskIds : startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index,0,draggableId)
    const newFinish = {
        ...finish,
        taskIds:finishTaskIds
    }
    setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        },
      }));
      return

  };
  return (
    <div className="main-page">
      <div className="column-parent">
        <DragDropContext onDragEnd={dragEnd}>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Main;
