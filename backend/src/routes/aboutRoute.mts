import { Router } from "express";
import ProfileColumns from "../models/userAboutSchema.js";

export const profileColumnsRouter = Router();

/**
 * GET /profile-columns
 * Hämtar användarens kolumndata, skapar tomt dokument vid behov.
 */
profileColumnsRouter.get("/", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).end();

    let doc = await ProfileColumns.findOne({ userId }).lean();

    if (!doc) {
      doc = await ProfileColumns.create({
        userId,
        about: [],
        music: [],
        movies: [],
      });
    }

    res.json(doc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to load profile columns" });
  }
});

profileColumnsRouter.put("/", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).end();

    const about = Array.isArray(req.body?.about) ? req.body.about : undefined;
    const music = Array.isArray(req.body?.music) ? req.body.music : undefined;
    const movies = Array.isArray(req.body?.movies)
      ? req.body.movies
      : undefined;

    const update: any = { updatedAt: new Date() };
    if (about) update.about = about;
    if (music) update.music = music;
    if (movies) update.movies = movies;

    const doc = await ProfileColumns.findOneAndUpdate(
      { userId },
      { $set: update },
      { upsert: true, new: true }
    );

    res.json(doc);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to save profile columns" });
  }
});
