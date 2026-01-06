import { Schema, model } from "mongoose";

const photoSchema = new Schema(
  {
    userId: { type: String, required: true },
    fileId: { type: String, required: true },
    caption: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const Photo = model("Photo", photoSchema);
export default Photo;
