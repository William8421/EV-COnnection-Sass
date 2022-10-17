import mongoose from "mongoose";
import userApp from "./userApp.js";
const { Schema } = mongoose;

const boardCommentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    comment: { type: String, required: true },
    userId: {
      type: Number,
    },
    imgProfile: { type: String },
    createdAt: { type: String },
    dateNow: { type: Array },
    commentId: { type: Number },
    author: [{ type: Schema.Types.ObjectId, ref: "userApp" }],
  },
  { timestamps: true }
);

const boardComment = mongoose.model("boardComment", boardCommentSchema);

export default boardComment;
