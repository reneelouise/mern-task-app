const Task = require("../model/taskModel");

// CREATE a task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// GET all tasks

const getTasks = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// GET single task

const getTask = async (req, res) => {
  try {
    const { id } = req.params; // Extract the task ID from the URL parameter
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DELETE task

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json(`No task found with id: ${id}`);
    }

    res.status(200).send("task deleted");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// DELETE task

const deleteCompletedTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json(`No task found with id: ${id}`);
    }

    res.status(200).send("task deleted");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// UPDATE task

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json(`No task with id: ${id}`);
    }

    // If the task is found and updated, send a 200 response
    res.status(200).json(task);
  } catch (error) {
    // Handle errors, but do not send a response here
    res.status(500).json({ msg: error.message });
  }
};

// POST completed task

const createCompletedTask = async (req, res) => {
  try {
    const response = await Task.create(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// GET completed tasks

const getCompletedTasks = async(req, res) => {
    try {
        const response = await Task.find()
        res.status(200).json(response)

    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports = {
  createTask,
  createCompletedTask,
  getTasks,
  getTask,
  getCompletedTasks,
  updateTask,
  deleteTask,
  deleteCompletedTask,
};
