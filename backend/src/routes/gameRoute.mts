import { Router } from "express";
import UserGame from "../models/userGame.js";
import UserCommunity from "../models/userCommunity.js";

export const profileTabGames = Router();

profileTabGames.get("/games", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "No user in request" });

    const games = await UserGame.find({ userId })
      .sort({ createdAt: -1 })
      .lean();
    return res.json(games);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to fetch games" });
  }
});

profileTabGames.post("/games", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "No user in request" });

    const rawgId = Number(req.body?.rawgId);
    const name = String(req.body?.name ?? "").trim();
    const coverUrl = String(req.body?.coverUrl ?? "").trim();

    if (!rawgId || !name) {
      return res.status(400).json({ message: "rawgId and name are required" });
    }

    const created = await UserGame.create({ userId, rawgId, name, coverUrl });
    return res.status(201).json(created);
  } catch (e: any) {
    if (e?.code === 11000) {
      return res.status(409).json({ message: "Game already added" });
    }
    console.error(e);
    return res.status(500).json({ message: "Failed to add game" });
  }
});

profileTabGames.delete("/games/:id", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "No user in request" });

    const { id } = req.params;

    const game = await UserGame.findById(id);
    if (!game) return res.status(404).json({ message: "Not found" });
    if (game.userId !== userId)
      return res.status(403).json({ message: "Forbidden" });

    await UserGame.deleteOne({ _id: id });
    return res.json({ message: "Deleted", id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to delete game" });
  }
});

profileTabGames.get("/communities", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "No user in request" });

    const communities = await UserCommunity.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return res.json(communities);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to fetch communities" });
  }
});

profileTabGames.post("/communities", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "No user in request" });

    const rawgId = Number(req.body?.rawgId);
    const name = String(req.body?.name ?? "").trim();
    const coverUrl = String(req.body?.coverUrl ?? "").trim();

    if (!rawgId || !name) {
      return res.status(400).json({ message: "rawgId and name are required" });
    }

    const created = await UserCommunity.create({
      userId,
      rawgId,
      name,
      coverUrl,
      createdAt: new Date(),
    });

    return res.status(201).json(created);
  } catch (e: any) {
    if (e?.code === 11000) {
      return res.status(409).json({ message: "Community already added" });
    }
    console.error(e);
    return res.status(500).json({ message: "Failed to add community" });
  }
});

profileTabGames.delete("/communities/:id", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "No user in request" });

    const { id } = req.params;

    const c = await UserCommunity.findById(id);
    if (!c) return res.status(404).json({ message: "Not found" });
    if (c.userId !== userId)
      return res.status(403).json({ message: "Forbidden" });

    await UserCommunity.deleteOne({ _id: id });
    return res.json({ message: "Deleted", id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to delete community" });
  }
});
