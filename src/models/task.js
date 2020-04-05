const mongoose = require("mongoose");
const validator = require("validator");

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false,
    required: true
  }
});

// const task = new Task({
//   description: "First task"
// });

// task.save().then(() => {
//   console.log("Task created: " + task);
// }).catch(error => {
//   console.log("Task cannot be added! " + error);
// });

module.exports = Task;
