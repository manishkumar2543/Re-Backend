import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      index: true,
    },
    title: {
      type: String,
      required: [true, "Chat title is required"],
      trim: true,
      maxlength: [150, "Chat title cannot be more than 150 characters long"],
      default: "New Chat",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

chatSchema.index({ user: 1, updatedAt: -1 });

const chatModel = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default chatModel;
