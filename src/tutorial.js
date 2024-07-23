export const initialData = {
    tasks: {
      "task-1": {
        id: "task-1",
        content: "Get familiar with the interface",
        description:
          "Take out the trash from the kitchen countertop and place it all the way in trash bin outside without fail",
        tags: ["Household", "Quick"],
      },
      "task-2": {
        id: "task-2",
        content: "do laundry",
        description:
          "Take all the clothes from the baseket and place it in the washing machine and then once the cycle is done put it to dry",
        tags: ["Household", "Time Consuming", "Slow"],
      },
      "task-3": {
        id: "task-3",
        content: "prepare dinner",
        description: "buy raw materials from the store and make dinner for 4",
        tags: ["Long Process"],
      },
      "task-4": {
        id: "task-4",
        content: "pay taxes",
        description: "Speak to your agent for more details",
        tags: ["Seek help","Hard"],
      },
      "task-5": {
        id: "task-5",
        content: "wash the dishes",
        description: "clean the dishes before you run out of clean dishes",
        tags: ["Household","Slow","Polymer"],
      },
    },
    taskCount: 5,
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: ["task-4", "task-5"],
      },
      "column-2": {
        id: "column-2",
        title: "In progress",
        taskIds: ["task-3"],
      },
      "column-3": {
        id: "column-3",
        title: "Completed",
        taskIds: ["task-1", "task-2"],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
  };
  