const SingleTask = (props) => {
  const task = props.task;
  const type = props.type;
  const index = props.index;
  // console.log(props.onMoveClick);
  const bgColor = (type) => {
    if (type === "todo") {
      return "gray";
    } else if (type === "progress") {
      return "yellow";
    } else {
      return "green";
    }
  };

  const handleMoveClick = (e) => {
    e.preventDefault();
    props.onMoveClick(task);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    props.onDeleteClick(task);
  };
  return (
    <div
      style={{
        backgroundColor: bgColor(type),

        margin: "5px",
        padding: "2px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          padding: "5px",
          margin: "0px",
          overflow: "hidden",
          overflowWrap: "break-word",
        }}
      >
        {task.title}
      </div>
      {/* <div style={{ justifyContent: "flex-end" }}> */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {type !== "done" && (
          <button
            style={{ cursor: "pointer", height: "30px" }}
            onClick={handleMoveClick}
          >
            Move
          </button>
        )}

        <button
          style={{ cursor: "pointer", height: "30px" }}
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default SingleTask;
