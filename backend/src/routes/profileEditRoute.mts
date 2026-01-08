import { Router } from "express";
import UserProfile from "../models/userProfileSchema.js";

export const profileMeRouter = Router();

/**
 * GET /me/profile
 * Hämtar min profil, skapar ett tomt dokument om det saknas.
 */
profileMeRouter.get("/profile", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).end();

    let doc = await UserProfile.findOne({ userId }).lean();

    if (!doc) {
      doc = await UserProfile.create({
        userId,
        avatarPhotoId: "",
        coverPhotoId: "",
        updatedAt: new Date(),
      });
    }

    return res.json(doc);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to load profile" });
  }
});

/**
 * PUT /me/profile
 * Sparar avatar/cover.
 */
profileMeRouter.put("/profile", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).end();

    const avatarPhotoId =
      typeof req.body?.avatarPhotoId === "string" ? req.body.avatarPhotoId : "";
    const coverPhotoId =
      typeof req.body?.coverPhotoId === "string" ? req.body.coverPhotoId : "";

    const doc = await UserProfile.findOneAndUpdate(
      { userId },
      {
        $set: {
          avatarPhotoId: avatarPhotoId.trim(),
          coverPhotoId: coverPhotoId.trim(),
          updatedAt: new Date(),
        },
      },
      { upsert: true, new: true }
    ).lean();

    return res.json(doc);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to save profile" });
  }
});
