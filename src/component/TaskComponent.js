import { useReducer, useState } from "react";
import SingleTodo from "./SingleTodo";

const ACTIONS = {
  ADD_TODO: "add-todo",
  MOVE_TODO: "move-todo",
  DELETE_TODO: "delete-todo",
};

function reducer(tasks, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      const newTask = {
        title: action.payload.title,
        type: action.payload.taskType,
        id: Date.now(),
      };
      if (action.payload.title !== "") return [...tasks, newTask];
      return tasks;

    case ACTIONS.MOVE_TODO:
      const taskToMove = action.payload.task;
      if (taskToMove && taskToMove.type === "todo") {
        const findIndex = tasks.findIndex(
          (task) =>
            task.type === taskToMove.type && task.title === taskToMove.title
        );
        if (findIndex !== -1) {
          const newTask = {
            ...taskToMove,
            type: "progress",
          };

          let newTaskArray = [];
          for (let i = 0; i < tasks.length; i += 1) {
            if (findIndex !== i) {
              newTaskArray.push(tasks[i]);
            }
          }

          return [...newTaskArray, newTask];
        }
      } else if (taskToMove && taskToMove.type === "progress") {
        const findIndex = tasks.findIndex(
          (task) =>
            task.type === taskToMove.type && task.title === taskToMove.title
        );
        if (findIndex !== -1) {
          const newTask = {
            ...taskToMove,
            type: "done",
          };
          let newTaskArray = [];
          for (let i = 0; i < tasks.length; i += 1) {
            if (findIndex !== i) {
              newTaskArray.push(tasks[i]);
            }
          }
          return [...newTaskArray, newTask];
        }
      }

      return tasks;

    case ACTIONS.DELETE_TODO:
      const taskToDelete = action.payload.task;
      const findIndex = tasks.findIndex(
        (task) =>
          task.type === taskToDelete.type && task.title === taskToDelete.title
      );

      if (findIndex !== -1) {
        let newTaskArray = [];
        for (let i = 0; i < tasks.length; i += 1) {
          if (findIndex !== i) {
            newTaskArray.push(tasks[i]);
          }
        }
        return newTaskArray;
      }
      return tasks;
  }
}

export default function TaskComponent() {
  const [tasks, dispatch] = useReducer(reducer, [
    // { type: "todo", title: "ABC" },
    // { type: "todo", title: "XYZ" },
  ]);

  let todos = tasks.filter((task) => {
    if (task.type === "todo") {
      return true;
    }
    return false;
  });

  let progress = tasks.filter((task) => {
    if (task.type === "progress") {
      return true;
    }
    return false;
  });

  let done = tasks.filter((task) => {
    if (task.type === "done") {
      return true;
    }
    return false;
  });

  function onMoveClick(task) {
    dispatch({
      type: ACTIONS.MOVE_TODO,
      payload: {
        task: task,
      },
    });
  }

  function onDeleteClick(task) {
    dispatch({
      type: ACTIONS.DELETE_TODO,
      payload: {
        task: task,
      },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: ACTIONS.ADD_TODO,
      payload: {
        taskType: document.getElementById("list").value,
        title: document.getElementById("textarea").value,
      },
    });
    document.getElementById("textarea").value = "";
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: "10px",
          marginLeft: "10px",
          flex: 1,
          gap: "16px",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <textarea
          id="textarea"
          placeholder="set your task"
          style={{
            padding: "7px",
            resize: "none",
            width: "270px",
            height: "100px",
            fontSize: "15px",
          }}
        ></textarea>

        <select
          id="list"
          style={{
            width: "100px",
            height: "40px",
            cursor: "pointer",
          }}
        >
          <option value="todo">Todo</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          style={{
            background: "#32a852",
            border: "1px solid black",
            width: "70px",
            height: "40px",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "30px",
          // flex: 1,
        }}
      >
        <SingleTodo
          title="Todo"
          task={todos}
          type={"todo"}
          onMoveClick={onMoveClick}
          onDeleteClick={onDeleteClick}
        />
        <SingleTodo
          title="In Progress"
          task={progress}
          type={"progress"}
          onMoveClick={onMoveClick}
          onDeleteClick={onDeleteClick}
        />
        <SingleTodo
          title="Done"
          task={done}
          type={"done"}
          onDeleteClick={onDeleteClick}
        />
      </div>
    </div>
  );
}
