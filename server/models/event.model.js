import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    titleSlug: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    eventImageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    category: [
      {
        type: String,
        trim: true,
      },
    ],
    location: {
      type: String,
      trim: true,
      required: true,
    },
    date: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clubs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },
    registrationUrl: {
      type: String,
      default: ""
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.set("toJSON", {
  versionKey: false,
});

eventSchema.index({ createdAt: -1 });

eventSchema.set("toJSON", {
  versionKey: false,
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
