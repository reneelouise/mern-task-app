import React from "react";

const TaskForm = ({ onHandleSubmit, task, setTask }) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Add a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" onClick={(e) => onHandleSubmit(e)}>
        Add
      </button>
    </form>
  );
};

export default TaskForm;
