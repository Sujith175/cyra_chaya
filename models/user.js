const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },

  userStatus: {
    type: String,
    default: "user",
  },
  activeUser: {
    type: "String",
    default: "active",
  },
});

module.exports = mongoose.model("User", UserSchema);
