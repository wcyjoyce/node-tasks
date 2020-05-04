const express = require("express");

require("./db/mongoose.js");

const userRouter = require("./routers/user.js");
const taskRouter = require("./routers/task.js");

const app = express();
const port = process.env.PORT || 3000;

// Applying middleware: limits the REST paths that users have access to
app.use((req, res, next) => {
  if (req.method === "GET") {
    res.send("GET requests are disabled.");
  } else {
    next();
  };
});

// Applying middleware: maintenance mode limits users from POST paths
// app.use((req, res, next) => {
//   if (req.method === "POST") {
//     res.status(503).send("The site is currently undergoing maintenance and will be back up and running shortly!");
//   } else {
//     next();
//   };
// });

app.use(express.json()); // parse incoming JSON to an object for further handling

// Connects routers
app.use(userRouter);
app.use(taskRouter);

// Loads server on defined ports
app.listen(port, () => {
  console.log("Server is running on port " + port + ".");
})
