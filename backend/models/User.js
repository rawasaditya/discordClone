const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
  email: {
    type: String,
    unique: true,
  },
  bio: {
    type: String,
  },
  friends: [{ type: mongoose.Schema.Types.Object, ref: "User" }],
});

module.exports = mongoose.model("User", UserSchema);
