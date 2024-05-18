import { useReducer, useState } from "react";

/*
improvement: 
1. Handling todo, progress and done in a single array
2. Handle adding, removing and moving tasks with useReducer hook.
3. Adding new tasks without temporary array.

*/

function SingleTicket() {
  const [todo, setTodo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState([]);

  // const [todos, setTodos] = useReducer(reducer, []);

  function onClickButton() {
    const selected = document.getElementById("list").value;
    const task = document.getElementById("textareaID").value;
    //const value = selected.value;
    //const text = TODO.options[TODO.selectedIndex].text;
    let newTodoArray = [];
    let newProgressArray = [];
    let newDoneArray = [];
    if (selected === "todo") {
      for (let i = 0; i < todo.length; i++) {
        newTodoArray.push(todo[i]);
      }
      if (!newTodoArray.includes(task)) {
        newTodoArray.push(task);
      }
      setTodo(newTodoArray);
      document.getElementById("textareaID").value = "";
    } else if (selected === "progress") {
      for (let i = 0; i < progress.length; i++) {
        newProgressArray.push(progress[i]);
      }
      if (!newProgressArray.includes(task)) {
        newProgressArray.push(task);
      }
      setProgress(newProgressArray);
      document.getElementById("textareaID").value = "";
    } else if (selected === "done") {
      for (let i = 0; i < done.length; i++) {
        newDoneArray.push(done[i]);
      }
      if (!newDoneArray.includes(task)) {
        newDoneArray.push(task);
      }
      setDone(newDoneArray);
      document.getElementById("textareaID").value = "";
    }
  }

  function onMoveClick(task, props) {
    // for (let i = 0; i < newTodoArray.length; i++) {
    //   if (!(newTodoArray[i] === task)) {
    //     newTodoedArray.push(newTodoArray[i]);
    //   } else {
    //     continue;
    //   }
    // }
    //
    // let index = newTodoArray.indexOf(task);
    // const halfBeforeTheUnwantedElement = newTodoArray.slice(0, index);
    // const halfAfterTheUnwantedElement = newTodoArray.slice(index + 1);
    // newTodoedArray = halfBeforeTheUnwantedElement.concat(
    //   halfAfterTheUnwantedElement
    // );
    // const newTodoedArray = newTodoArray.splice(index, 1);

    if (props === "todo") {
      let newTodoArray = [];
      let newProgressArray = [];

      for (let i = 0; i < progress.length; i++) {
        newProgressArray.push(progress[i]);
      }
      if (!newProgressArray.includes(task)) {
        newProgressArray.push(task);
      }
      setProgress(newProgressArray);

      let index = todo.indexOf(task);
      const halfBeforeTheUnwantedElement = todo.slice(0, index);
      const halfAfterTheUnwantedElement = todo.slice(index + 1);
      newTodoArray = halfBeforeTheUnwantedElement.concat(
        halfAfterTheUnwantedElement
      );

      setTodo(newTodoArray);
    } else if (props === "progress") {
      let newProgressArray = [];
      let newDoneArray = [];

      for (let i = 0; i < done.length; i++) {
        newDoneArray.push(done[i]);
      }
      if (!newDoneArray.includes(task)) {
        newDoneArray.push(task);
      }
      setDone(newDoneArray);

      let index = progress.indexOf(task);
      const halfBeforeTheUnwantedElement = progress.slice(0, index);
      const halfAfterTheUnwantedElement = progress.slice(index + 1);
      newProgressArray = halfBeforeTheUnwantedElement.concat(
        halfAfterTheUnwantedElement
      );

      setProgress(newProgressArray);
    }
    // newTodoArray = newTodoArray.splice(index, 1);

    // newProgressArray.push(task);
    // setProgress(newProgressArray);

    // const td = document.getElementById("todo").value;
    // let newTodoedArray = [];
    // for (let i = 0; i < newTodoArray.length; i++) {
    //   if (td === "task") continue;
    //   else {
    //     newTodoedArray.push(newTodoArray);
    //   }
    // }
    // setTodo(newTodoedArray);

    // newTodoedArray = newProgressArray.filter(function (item) {
    //   return item !== task;
    // });
  }

  function onDeleteClick(task, props) {
    if (props === "todo") {
      let newTodoArray = [];
      newTodoArray = todo.filter(function (item) {
        return item !== task;
      });
      setTodo(newTodoArray);
    } else if (props === "progress") {
      let newProgressArray = [];
      newProgressArray = progress.filter(function (item) {
        return item !== task;
      });
      setProgress(newProgressArray);
    } else if (props === "done") {
      let newDoneArray = [];
      newDoneArray = done.filter(function (item) {
        return item !== task;
      });
      setDone(newDoneArray);
    }
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "30px",
          flex: 1,
          //  maxWidth: {document.documentElement.clientWidth},
        }}
      >
        <div>
          <h3 style={{ textAlign: "center" }}>Todo</h3>

          {todo.map((task, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid black",
                  margin: "5px 0",
                  alignItems: "center",
                  borderRadius: "5px",
                }}
                id="todo"
              >
                <div
                  key={index}
                  style={{
                    width: "200px",
                    height: "30px",
                    margin: "5px 0",
                    padding: "0 5px",
                    // textAlign: "",
                  }}
                >
                  {task}
                </div>
                <div
                  style={{
                    width: "70px",
                    height: "30px",
                    // padding: "1px 0",
                    margin: "4px 3px",
                    // border: "1px solid black",
                    textAlign: "center",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "teal",
                    color: "white",
                    fontSize: "14px",
                  }}
                  onClick={() => onMoveClick(task, "todo")}
                >
                  Move
                </div>
                <div
                  style={{
                    width: "70px",
                    height: "30px",
                    // padding: "1px 0",
                    margin: "4px 3px",
                    // border: "1px solid black",
                    textAlign: "center",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "teal",
                    color: "white",
                    fontSize: "14px",
                  }}
                  onClick={() => onDeleteClick(task, "todo")}
                >
                  Delete
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h3 style={{ textAlign: "center" }}>In Progress</h3>
          {progress.map((progressTask, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid black",
                  margin: "5px 0",
                  alignItems: "center",
                  borderRadius: "5px",
                }}
                id="progress"
              >
                <div
                  key={index}
                  style={{
                    width: "200px",
                    height: "30px",
                    margin: "5px 0",
                    padding: "0 5px",
                    // textAlign: "",
                  }}
                >
                  {progressTask}
                </div>
                <div
                  style={{
                    width: "70px",
                    height: "30px",
                    // padding: "1px 0",
                    margin: "4px 3px",
                    // border: "1px solid black",
                    textAlign: "center",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "teal",
                    color: "white",
                    fontSize: "14px",
                  }}
                  onClick={() => onMoveClick(progressTask, "progress")}
                >
                  Move
                </div>
                <div
                  style={{
                    width: "70px",
                    height: "30px",
                    // padding: "1px 0",
                    margin: "4px 3px",
                    // border: "1px solid black",
                    textAlign: "center",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "teal",
                    color: "white",
                    fontSize: "14px",
                  }}
                  onClick={() => onDeleteClick(progressTask, "progress")}
                >
                  Delete
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h3 style={{ textAlign: "center" }}>Done</h3>
          {done.map((task, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  border: "1px solid black",
                  margin: "5px 0",
                  alignItems: "center",
                  borderRadius: "5px",
                }}
                id="done"
              >
                <div
                  key={index}
                  style={{
                    width: "200px",
                    height: "30px",
                    margin: "5px 0",
                    padding: "0 5px",
                    // textAlign: "",
                  }}
                >
                  {task}
                </div>
                <div
                  style={{
                    width: "70px",
                    height: "30px",
                    // padding: "1px 0",
                    margin: "4px 3px",
                    // border: "1px solid black",
                    textAlign: "center",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "teal",
                    color: "white",
                    fontSize: "14px",
                  }}
                  onClick={() => onMoveClick(task, "done")}
                >
                  Move
                </div>
                <div
                  style={{
                    width: "70px",
                    height: "30px",
                    // padding: "1px 0",
                    margin: "4px 3px",
                    // border: "1px solid black",
                    textAlign: "center",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "teal",
                    color: "white",
                    fontSize: "14px",
                  }}
                  onClick={() => onDeleteClick(task, "done")}
                >
                  Delete
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", padding: "10px" }}>
        <div style={{ padding: "3px" }}>
          <textarea placeholder="set your task" id="textareaID"></textarea>
        </div>
        <div style={{ padding: "3px" }}>
          <select id="list">
            <option value="todo">Todo</option>
            <option value="progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div
          style={{
            padding: "3px",
            border: "1px solid black",
            width: "50px",
            height: "25px",
            cursor: "pointer",
          }}
          onClick={onClickButton}
        >
          Add
        </div>
      </div>
    </div>
  );
}
export default SingleTicket;
