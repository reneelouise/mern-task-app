import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaCheckDouble, FaCheck } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import TaskForm from "./task-form.component";

const Task = () => {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState("");
  const [updatedTask, setUpdatedTask] = useState("");
  const [updatingTask, setUpdatingTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  const URL = "http://localhost:5000/api/tasks";

  const onHandleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(`${URL}/${id}`, {
        headers: {
          token: "TOKEN",
        },
      });
      if (response.status === 200) {
        console.log("Task deleted successfully");
        setTaskList(taskList.filter((task) => task._id !== id));
      } else {
        console.log("Error deleting task. Status code: " + response.status);
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const onHandleUpdateTask = async (id) => {
    setUpdatingTask(id);
    try {
      const response = await axios.patch(`${URL}/${id}`, {
        name: updatedTask,
      });

      console.log("response: ", response);
      console.log("successfully updated");
    } catch (error) {
      console.error(error);
    }
  };

  const onHandleCheck = async (name, id) => {
      console.log("name: ", name)
    try {
      // Create as completed task in the database
      const response = await axios.post(`${URL}/completed`, {
        name: name
      });

      if (response.status === 200) {
        console.log("response: ", response);
        setCompletedTasks([...completedTasks, name]);
                

      }

      console.log("response:", response);
      console.log("Task successfully added to completed tasks");

    //   // Check if the task ID is already in completedTasks
    //   if (completedTasks.includes(id)) {
    //     // Remove the task ID if it's already completed
    //     setCompletedTasks(completedTasks.filter((taskId) => taskId !== id));
    //   } else {
    //     // Add the task ID to completedTasks if not completed
    //     setCompletedTasks([...completedTasks, id]);
    //   }
    } catch (error) {
      console.error(error);
    }
  };
  
  console.log("completed tasks: ", completedTasks);
  
  const onHandleUncheck = async ( id) => {
    try {
      // Create as completed task in the database
      const response = await axios.delete(`${URL}/completed/${id}`, {
           headers: {
          token: "TOKEN",
        },
      });
      if (response.status === 200) {
        console.log("Completed task removed successfully");
        setCompletedTasks(completedTasks.filter((task) => task._id !== id));
      }

      console.log("response:", response);
      console.log("Task successfully added to completed tasks");

      // Check if the task ID is already in completedTasks
      if (completedTasks.includes(id)) {
        // Remove the task ID if it's already completed
        setCompletedTasks(completedTasks.filter((taskId) => taskId !== id));
      } else {
        // Add the task ID to completedTasks if not completed
        setCompletedTasks([...completedTasks, id]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(URL, {
        name: task,
      });
      if (response.status === 200) {
        console.log("response: ", response);
        setTaskList([...taskList, task]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch Tasks

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setTaskList(response.data);
      } catch (error) {
        console.log("Error fetching data");
      }
    };

    fetchData(); // Call the async function
  }, [taskList]);

  // fetch Completed Tasks

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get(`${URL}/completed`);
        setCompletedTasks(response.data);
      } catch (error) {
        console.log("Error fetching completed tasks");
      }
    };

    fetchCompletedTasks();
  }, [completedTasks]);

  return (
    <>
      <TaskForm onHandleSubmit={onHandleSubmit} task={task} setTask={setTask} />
      <div>
        <div className="container">
          <p className="subheading">Total tasks: {taskList.length}</p>
          <p className="subheading">Completed tasks: {completedTasks.length}</p>
        </div>
        <div className="tasklist">
          {taskList.map((task, idx) => (
            <div className="container">
              {updatingTask === task._id ? (
                <form>
                  <input
                    type="text"
                    placeholder={task.name}
                    value={updatedTask}
                    onChange={(e) => setUpdatedTask(e.target.value)}
                  />
                  <button
                    type="submit"
                    onClick={() => onHandleUpdateTask(task._id)}
                  >
                    Save
                  </button>
                </form>
              ) : (
                <h3 id={idx}>{task.name}</h3>
              )}

              <div className="icons">
                {completedTasks.includes(task._id) ? (
                  <FaCheckDouble
                    className="check"
                    onClick={() => onHandleUncheck( task._id)}
                  />
                ) : (
                  <FaCheck
                    className="check"
                    onClick={() => onHandleCheck(task.name, task._id)}
                  />
                )}
                <FaEdit
                  className="edit"
                  onClick={() => onHandleUpdateTask(task._id)}
                />
                <RiDeleteBinLine
                  className="delete"
                  onClick={() => onHandleDeleteTask(task._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Task;
