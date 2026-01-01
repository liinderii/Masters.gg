import express from "express";
import Post from "../models/postSchema.js";

export const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) {
      return res.status(401).json({ message: "No user in request" });
    }
    const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

postRouter.post("/", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    const { content } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "No user in request" });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content is required" });
    }

    const newPost = await Post.create({
      userId,
      content: content.trim(),
      createdAt: new Date(),
    });

    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});
