import { Schema, model } from "mongoose";

const userCommunitySchema = new Schema(
  {
    userId: { type: String, required: true },

    name: { type: String, required: true },

    rawgId: { type: Number, required: true },

    coverUrl: { type: String, default: "" },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

userCommunitySchema.index({ userId: 1, rawgId: 1 }, { unique: true });

const UserCommunity = model("UserCommunity", userCommunitySchema);
export default UserCommunity;
