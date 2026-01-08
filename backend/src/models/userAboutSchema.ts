import { Schema, model } from "mongoose";

const profileColumnsSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },

    about: { type: [String], default: [] },
    music: { type: [String], default: [] },
    movies: { type: [String], default: [] },

    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

const ProfileColumns = model("ProfileColumns", profileColumnsSchema);
export default ProfileColumns;
