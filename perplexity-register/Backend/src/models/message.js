import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: [true, "Chat reference is required"],
      index: true,
    },
    content: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "ai"],
        message: "Role must be either user or ai",
      },
      required: [true, "Message role is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

messageSchema.index({ chat: 1, createdAt: 1 });

const messageModel =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default messageModel;
