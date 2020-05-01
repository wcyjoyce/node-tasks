const express = require("express");

require("./db/mongoose.js");
const Task = require("./models/task.js");
const User = require("./models/user.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // parse incoming JSON to an object for further handling

///// MODEL #1: USERS /////

// CRUD #1: Creating users
app.post("/users", async (req, res) => {
  const user = new User(req.body);

  // user.save().then(() => {
  //   res.status(201).send(user);
  // }).catch(error => {
  //   res.status(400).send(error);
  // });

  // Refactoring with async/await
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  };
});

// CRUD #2: Fetching all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  };
});

// CRUD #3: Fetching individual user
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return !user ? res.status(404).send() : res.send(user);
  } catch (error) {
    res.status(500).send(error);
  };
});

// CRUD #4: Updating a user
app.patch("/users/:id", async (req, res) => {
  // Check if the updated fields are editable
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "age", "email"];
  const isValid = updates.every(update => allowedUpdates.includes(update)); // "every" - everything needs to be true in order to return true

  if (!isValid) {
    return res.status(400).send({ error: "Invalid updates." });
  };

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    return !user ? res.status(404).send() : res.send(user);
  } catch (error) {
    res.status(400).send(error);
  };
});

// CRUD #5: Deleting a user
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return !user ? res.status(404).send(error) : res.send(user);
  } catch (error) {
    res.send(500).send(error);
  };
});

///// MODEL #2: TASKS /////

// CRUD #1: Creating tasks
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch(error) {
    res.status(400).send(error);
  };
});

// CRUD #2: Listing all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch(error) {
    res.status(400).send(error);
  };
});

// CRUD #3: Listing individual task
app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    return !task ? res.status.send(404).send() : res.send(task);
  } catch(error) {
    res.status(500).send(error);
  };
});

// CRUD #4: Updating a task
app.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValid = updates.every(update => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send({ error: "Invalid updates." });
  };

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    return !task ? res.status(400).send() : res.send(task);
  } catch (error) {
    res.status(400).send(error);
  };
});

// CRUD #5: Deleting a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    return !task ? res.status(400).send(error) : res.send(task);
  } catch (error) {
    res.status(500).send(error);
  };
});

app.listen(port, () => {
  console.log("Server is running on port " + port + ".");
})
