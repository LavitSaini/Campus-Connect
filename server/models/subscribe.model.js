import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

subscribeSchema.set("toJSON", {
  versionKey: false,
});

const Subscribe = new mongoose.model("SubscribedEmail", subscribeSchema);

export default Subscribe;
