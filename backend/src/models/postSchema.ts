import { Schema, model } from "mongoose";

const attachmentSchema = new Schema(
  {
    kind: { type: String, enum: ["photo", "video"], required: true },
    refId: { type: Schema.Types.ObjectId, required: true },
  },
  { _id: false }
);

const postSchema = new Schema(
  {
    userId: { type: String, required: true },

    content: { type: String, default: "" },

    attachments: { type: [attachmentSchema], default: [] },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const Post = model("Post", postSchema);
export default Post;
