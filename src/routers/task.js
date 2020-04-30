const express = require("express");
const router = new express.Router();

const Task = require("../models/task.js");

// CRUD #1: Creating tasks
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch(error) {
    res.status(400).send(error);
  };
});

// CRUD #2: Listing all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch(error) {
    res.status(400).send(error);
  };
});

// CRUD #3: Listing individual task
router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    return !task ? res.status.send(404).send() : res.send(task);
  } catch(error) {
    res.status(500).send(error);
  };
});

// CRUD #4: Updating a task
router.patch("/tasks/:id", async (req, res) => {
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
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    return !task ? res.status(400).send(error) : res.send(task);
  } catch (error) {
    res.status(500).send(error);
  };
});

module.exports = router;
