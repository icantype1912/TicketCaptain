import React, { useEffect, useState } from "react";
import { Column } from "../components/Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { doc, setDoc, getDoc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";

const Main = (props) => {
  const { db } = props;
  const [data, setData] = useState(null);

  const dragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (type === "column") {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      setData((prev) => ({
        ...prev,
        columnOrder: newColumnOrder,
      }));
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
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }));
    return;
  };

  const retrieveData = async () => {
    try {
      const docRef = doc(db, "ticketData", "main");
      const docSnap = await getDoc(docRef);
      setData(docSnap.data());
    } catch (error) {
      console.error("Error retrieving document: ", error);
    }
  };

  const storeData = async (data) => {
    try {
      await setDoc(doc(db, "ticketData", "main"), data);
      console.log("Data stored successfully!");
    } catch (error) {
      console.error("Error storing data: ", error);
    }
  };

  useEffect(() => {
    retrieveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      storeData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="main-page">
      {data ? (
        <DragDropContext onDragEnd={dragEnd}>
          <Droppable
            droppableId="allColumns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="column-parent"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data.columnOrder.map((columnId, index) => {
                  const column = data.columns[columnId];
                  const tasks = column.taskIds.map(
                    (taskId) => data.tasks[taskId]
                  );
                  return (
                    <Column
                      key={column.id}
                      column={column}
                      tasks={tasks}
                      index={index}
                      setData={setData}
                      data={data}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "48%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );
};

export default Main;
