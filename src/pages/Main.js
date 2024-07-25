import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  doc,
  setDoc,
  getDoc,
  where,
  query,
  collection,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import { nanoid } from "nanoid";
import { initialData } from "../utilities/tutorial";
import { Column } from "../components/Column";
import { ColabModal } from "../components/ColabModal";

const Main = (props) => {
  const { db, user } = props;
  const [openColab, setOpenColab] = useState(false);
  const [data, setData] = useState(null);
  const [boardId, setBoardId] = useState(null);
  const [boardExists, setBoardExists] = useState(true);

  const handleOpenColab = () => {
    setOpenColab(true);
  };

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
      if (boardExists) {
        const docRef = doc(db, "ticketData", boardId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          setData(initialData);
        }
      } else {
        setData(initialData);
      }
    } catch (error) {
      console.error("Error retrieving document: ", error);
    }
  };

  const storeData = async (data) => {
    try {
      await setDoc(doc(db, "ticketData", boardId), data);
      console.log("Data stored successfully!");
    } catch (error) {
      console.error("Error storing data: ", error);
    }
  };

  const getBoardId = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0];
        const docData = docSnapshot.data();

        if (docData.boardId) {
          setBoardId(docData.boardId);
          setBoardExists(true);
        } else {
          const newBoardId = nanoid();

          const userDocRef = doc(db, "users", docSnapshot.id);
          await updateDoc(userDocRef, { boardId: newBoardId });

          setBoardId(newBoardId);
        }
      } else {
        console.log("No matching documents.");
      }
    } catch (error) {
      console.error("Error getting or updating document: ", error);
    }
  };

  useEffect(() => {
    getBoardId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    retrieveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId]);

  useEffect(() => {
    if (data) {
      storeData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div className="h-10 flex justify-between ml-7 mr-7 items-center">
        <h1
          className="text-blue-900 hover:text-blue-800 hover:cursor-pointer"
          onClick={handleOpenColab}
        >
          Collaborate +
        </h1>
        <div className="flex gap-5">
          <h1 className="text-blue-900 hover:text-blue-800 hover:cursor-pointer">
            My Board
          </h1>
          <h1 className="text-blue-900 hover:text-blue-800 hover:cursor-pointer">
            Shared Boards
          </h1>
        </div>
      </div>
      <ColabModal openColab={openColab} setOpenColab={setOpenColab} db={db} user = {user}/>
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
    </>
  );
};

export default Main;
