const express = require("express");

require("./db/mongoose.js");
const Task = require("./models/task.js");
const User = require("./models/user.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // parse incoming JSON to an object for further handling

///// MODEL #1: USERS /////

// CRUD #1: Creating users
app.post("/users", (req, res) => {
  const user = new User(req.body);

  user.save().then(() => {
    res.status(201).send(user);
  }).catch(error => {
    res.status(400).send(error);
  });
});

// CRUD #2: Fetching all users
app.get("/users", (req, res) => {
  User.find({}).then(users => {
    res.send(users);
  }).catch(error => {
    res.status(400).send(error);
  });
});

// CRUD #3: Fetching individual user
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;

  User.findById(_id).then(user => {
    if (!user) {
      return res.status(404).send();
    };
    res.send(user);
  }).catch(error => {
    res.status(500).send(error);
  });
});

// CRUD #4: Updating a user (via promise chaining)
app.put("/users/:id", (req, res) => {
  const _id = req.params.id;

  User.findByIdAndUpdate(_id, { age: 30 }).then(user => {
    res.send(user);
    return User.countDocuments({ age: 30 });
  }).then(result => {
    console.log("Count: " + result);
  }).catch(error => {
    res.send(error);
  });
});

///// MODEL #2: TASKS /////

// CRUD #1: Creating tasks
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task.save().then(() => {
    res.status(201).send(task);
  }).catch(error => {
    res.status(400).send(error);
  });
});

// CRUD #2: Listing all tasks
app.get("/tasks", (req, res) => {
  Task.find({}).then(tasks => {
    res.send(tasks);
  }).catch(error => {
    res.status(400).send(error);
  });
});

// CRUD #3: Listing individual task
app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;

  Task.findById(_id).then(task => {
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  }).catch(error => {
    res.status(500).send(error);
  });
});

// CRUD #4: Updating a task
app.put("/tasks/:id", (req, res) => {
  const _id = req.params.id;

  Task.findByIdAndUpdate(_id, { completed: true }).then(task => {
    res.send(task);
    console.log(task);
    return Task.countDocuments({ completed: false });
  }).then(result => {
    console.log("Tasks outstanding: " + result);
  }).catch(error => {
    res.send(error);
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port + ".");
})
