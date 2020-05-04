const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
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
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid.");
        };
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password must be at least 7 characters and cannot contain 'password'.")
        };
      }
    },
    tokens: [{
      token: {
        type: String,
        required: true
      }
    }]
  }
);

// Setting up a credentials function so that this can be accessed in the router
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("This email cannot be found.")
  } else {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("The email/password combination is incorrect.")
    } else {
      return user;
    };
  };
};

// Generate authentication token method
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "hello");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// Adding middleware: validating something before user is saved/updated
userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8); // encrypting password by 8 rounds
  };

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
