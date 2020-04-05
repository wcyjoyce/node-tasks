const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/node-tasks-api", {
  useNewUrlParser: true,
  useCreateIndex: true, // indexes are created when models are created in Mongo DB
  useUnifiedTopology: true
});
