import { Schema, model } from "mongoose";

const userProfileSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },

    // Vi börjar smått: bara dessa två nu
    avatarPhotoId: { type: String, default: "" }, // Photo._id
    coverPhotoId: { type: String, default: "" }, // Photo._id

    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const UserProfile = model("UserProfile", userProfileSchema);
export default UserProfile;
