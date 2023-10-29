const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/controllers");

router.post("/api/tasks", createTask);
router.get("/api/tasks", getTasks);
router.get("/api/tasks/:id", getTask);
router.delete("/api/tasks/:id", deleteTask);
router.put("/api/tasks/:id", updateTask); // specify all fields in the model (i.e. name and completed)
router.patch("/api/tasks/:id", updateTask); // specify only the field of interest in updating in the model (i.e. name or completed)


module.exports = router;
