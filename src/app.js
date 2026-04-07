const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const taskRouter = require("./routes/taskRoutes");


const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth", authRouter);
app.use("/tasks", taskRouter);


module.exports = app;