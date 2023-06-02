const mongoose = require("mongoose");
const messagesSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: { type: String },
    type: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", messagesSchema);
