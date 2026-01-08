import { Schema, model } from "mongoose";

const friendRequestSchema = new Schema(
  {
    fromUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    toUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

// En pending request per pair
friendRequestSchema.index(
  { fromUserId: 1, toUserId: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: "pending" } }
);

const FriendRequest = model("FriendRequest", friendRequestSchema);
export default FriendRequest;
