import mongoose from "mongoose";
import userApp from "./userApp.js";
const {Schema}= mongoose;

const reviewModelSchema = new mongoose.Schema(
  {
    reviewId: { type: Number, require: true },
    fromUsername: { type: String },
    fromUserId: { type: Number, require: true },
    review: { type: String, require: true },
    toUsername: { type: String, require: true },
    toUserId: { type: Number, require: true },
    createdAt: { type: Number, require: true },
    dateNow: { type: Array, require: true },
    fromImgProfile: { type: String },
    author: [{ type: Schema.Types.ObjectId, ref: "userApp" }],
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("reviewModel", reviewModelSchema);

export default reviewModel;
