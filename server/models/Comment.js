import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipe",
      required: true,
    },
    name: { type: String, required: true },
    content: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);
export default Comment;
