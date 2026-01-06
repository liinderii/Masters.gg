import { Schema, model } from "mongoose";

const videoSchema = new Schema(
  {
    userId: { type: String, required: true },
    fileId: { type: String, required: true },
    title: { type: String, default: "" },
    game: { type: String, default: "" },
    views: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const Video = model("Video", videoSchema);
export default Video;
