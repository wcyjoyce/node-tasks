const express = require("express");
const router = new express.Router();

const User = require("../models/user.js");
const auth = require("../middleware/auth.js");

// CRUD #1: Creating users
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  };
});

// CRUD #2: Fetching all users
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  };
});

// CRUD #2.5: Fetching own individual profile
router.get("/users/profile", auth, (req, res) => {
  return res.send(req.user);
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
  const allowedUpdates = ["name", "age", "email", "password"];
  const isValid = updates.every(update => allowedUpdates.includes(update)); // "every" - everything needs to be true in order to return true


  if (!isValid) {
    return res.status(400).send({ error: "Invalid updates." });
  };

  try {
    // Only saving parameters that have been modified
    const user = await User.findById(req.params.id);
    updates.forEach(update => user[update] = req.body[update]);
    await user.save();

    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
    res.status(500).send(error);
  };
});

// #6: Logging in
router.post("/users/login", async (req,res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  };
});

// #7: Logging out
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  };
});

// #8: Logging out all sessions
router.post("/users/logout-all", auth, async (req, res) => {
  try {
    req.users.token = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  };
});

module.exports = router;
