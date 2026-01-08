import { Schema, model } from "mongoose";

const userGameSchema = new Schema(
  {
    userId: { type: String, required: true },
    rawgId: { type: Number, required: true },
    name: { type: String, required: true },
    coverUrl: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

userGameSchema.index({ userId: 1, rawgId: 1 }, { unique: true });

const UserGame = model("UserGame", userGameSchema);
export default UserGame;
