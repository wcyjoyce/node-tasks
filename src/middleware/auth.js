const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const auth = async (req, res, next) => {
  // 1) looks for header that user provides
  // 2) gets authorisation token provided in header (and removes "bearer" in the token)
  // 3) verifies token and make sure that it hasn't expired (token will be deleted when user is logged out)
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "hello"); // uses the same string when generating auth token
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token }); // finds user with the same token (that's still active)

    if (!user) {
      throw new Error()
    };

    req.token = token;
    req.user = user;
    next();
    return;

  } catch (error) {
    res.status(401).send({ error : "Please authenticate." });
  };

  console.log("Authorisation is working.");
  next();
};

module.exports = auth;
