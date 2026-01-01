import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    userId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const Post = model("Post", postSchema);

export default Post;
