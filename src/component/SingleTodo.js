import SingleTask from "./SingleTask";
export default function SingleTodo(props) {
  const title = props.title;
  const task = props.task;

  return (
    <div
      style={{
        backgroundColor: "#dedede",
        width: "350px",
        paddingBottom: "16px",
        borderRadius: "16px",
        alignSelf: "start",
      }}
    >
      <h2
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {title}
      </h2>
      {task.map((task, index) => {
        return (
          <SingleTask
            task={task}
            type={props.type}
            index={index}
            onMoveClick={props.onMoveClick}
            onDeleteClick={props.onDeleteClick}
          />
        );
      })}
    </div>
  );
}
