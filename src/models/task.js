const mongoose = require("mongoose");
const validator = require("validator");

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      reference: "User"
    }
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
