const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment_description: {
    type: String,
    required: true,
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;
