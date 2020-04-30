const express = require("express");

require("./db/mongoose.js");

const userRouter = require("./routers/user.js");
const taskRouter = require("./routers/task.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // parse incoming JSON to an object for further handling

// Connects routers
app.use(userRouter);
app.use(taskRouter);

// Loads server on defined ports
app.listen(port, () => {
  console.log("Server is running on port " + port + ".");
})
