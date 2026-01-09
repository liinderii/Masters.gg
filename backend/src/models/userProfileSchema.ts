import { Schema, model } from "mongoose";

const introSchema = new Schema(
  {
    livesIn: { type: String, default: "" },
    from: { type: String, default: "" },
    relationshipStatus: { type: String, default: "" },
  },
  { _id: false }
);

const userProfileSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },

    avatarPhotoId: { type: String, default: "" },
    coverPhotoId: { type: String, default: "" },

    bio: { type: String, default: "" },
    intro: { type: introSchema, default: () => ({}) },

    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const UserProfile = model("UserProfile", userProfileSchema);
export default UserProfile;
