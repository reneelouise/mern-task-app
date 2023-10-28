const dotenv = require("dotenv").config(); // give server.js access to read your .env file
const express = require("express");
const connectDB = require("./config/connectDB");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors");


const app = express();


// Middlewares

app.use(cors());
app.use(express.json()); // helps us to access the req.body and interpret it
app.use(taskRoutes);


// const logger = (req, res, next) => {   // next is added as an argument to give permission to the async funtion in the create task post req to run
//     console.log("Middleware ran")
//     console.log(req.method)
//     next()
// }

// Routes

app.get("/", (req, res) => {
  res.send("Home page");
});

const PORT = process.env.PORT || 5000;

// connect to MongoDB first before connecting to the server to avoid errors

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer(); // call the start server function
