export const initialData = {
    tasks: {
      "task-1": {
        id: "task-1",
        content: "Get familiar with the interface",
        description:
          "Welcome to your first board! try moving around the tiles and the columns...",
        tags: ["Tutorial", "Quick"],
      },
      "task-2": {
        id: "task-2",
        content: "Edit and Delete",
        description:
          "You can edit and delete tasks by clicking on the button on the right of the task box",
        tags: ["Tutorial"],
      },
      "task-3": {
        id: "task-3",
        content: "Create new task",
        description: "Click on the (+ Create issue) button below to create a new task",
        tags: ["Tutorial"],
      },
      "task-4": {
        id: "task-4",
        content: "Welcome to TicketCaptain",
        description: "Read the sample board to get a better understanding of our service",
        tags: ["Tutorial"],
      },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: ["task-1"],
      },
      "column-2": {
        id: "column-2",
        title: "In progress",
        taskIds: ["task-2","task-3"],
      },
      "column-3": {
        id: "column-3",
        title: "Completed",
        taskIds: [],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
  };
  