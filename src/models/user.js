const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive error.");
      };
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid.");
      };
    }
  }
});

// const user = new User({
//   name: "Joyce",
//   age: "26",
//   email: "joyce@gmail.com"
// });

// user.save().then(() => {
//   console.log("User created: " + user);
// }).catch(error => {
//   console.log("User cannot be added! " + error);
// });

module.exports = User;
