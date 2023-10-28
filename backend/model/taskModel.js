const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a task"],
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // automatically add a timestamp for any data we have created or updated in the database
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
