import mongoose from "mongoose";
import boardComment from "./boardComment.js";

const { Schema } = mongoose;

const userAppSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: {
        validator: (value) =>
          value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: { type: String, required: true, minLength: 6 },
    confirmPassword: { type: String },
    isOwner: { type: Boolean, require: true },
    id: {
      type: Number,
    },
    imgProfile: { type: String },
    availability: { type: String },
    address: { type: Object },
    addressInfo: { type: Object },
    telNumber: { type: String },
    reviewRate: { type: Object },
    typeOfCharger: { type: String },
    comments: { type: Array },
    reviews: { type: Array },
    activeConversation: { type: Array },
  },
  { timestamps: true }
);
userAppSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};
userAppSchema.statics.findByUsername = function (username) {
  return this.findOne({ username: username });
};
const userApp = mongoose.model("userApp", userAppSchema);

export default userApp;
