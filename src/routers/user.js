const express = require("express");
const router = new express.Router();

const User = require("../models/user.js")

// CRUD #1: Creating users
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  };
});

// CRUD #2: Fetching all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  };
});

// CRUD #3: Fetching individual user
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return !user ? res.status(404).send() : res.send(user);
  } catch (error) {
    res.status(500).send(error);
  };
});

// CRUD #4: Updating a user
router.patch("/users/:id", async (req, res) => {
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
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return !user ? res.status(404).send(error) : res.send(user);
  } catch (error) {
    res.send(500).send(error);
  };
});

module.exports = router;
