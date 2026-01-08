import { Router } from "express";
import Post from "../models/postSchema.js";
import { auth } from "../middlewares/auth.mjs";

export const postRouter = Router();

postRouter.get("/", auth, async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).end();

    const posts = await Post.find({ userId }).sort({ createdAt: -1 }).lean();
    res.json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

postRouter.get("/feed", auth, async (_req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    res.json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to fetch feed" });
  }
});

postRouter.post("/", auth, async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).end();

    const content = String(req.body?.content ?? "").trim();
    const attachments = Array.isArray(req.body?.attachments)
      ? req.body.attachments
      : [];

    if (!content && attachments.length === 0) {
      return res
        .status(400)
        .json({ message: "Content or attachments required" });
    }

    for (const a of attachments) {
      if (!a?.kind || !["photo", "video"].includes(a.kind)) {
        return res.status(400).json({ message: "Invalid attachment kind" });
      }
      if (!a?.refId) {
        return res.status(400).json({ message: "Invalid attachment refId" });
      }
    }

    const created = await Post.create({
      userId,
      content,
      attachments,
    });

    res.status(201).json(created);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to create post" });
  }
});

postRouter.delete("/:postId", auth, async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).end();

    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Not found" });

    if (post.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await Post.deleteOne({ _id: postId });

    return res.status(204).end();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to delete post" });
  }
});
