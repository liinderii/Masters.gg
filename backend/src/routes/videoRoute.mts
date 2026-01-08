import express from "express";
import mongoose from "mongoose";
import { GridFSBucket, ObjectId } from "mongodb";
import Video from "../models/videoSchema.js";
import { uploadVideo } from "../middlewares/uploadVideo.js";

export const videoRouter = express.Router();

function getBucket() {
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB not connected");
  return new GridFSBucket(db, { bucketName: "videos" });
}

videoRouter.get("/", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "No user in request" });

    const videos = await Video.find({ userId, origin: "profile" }).sort({
      createdAt: -1,
    });

    return res.status(200).json(videos);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

videoRouter.post("/", uploadVideo.single("file"), async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "No user in request" });

    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file provided" });

    const title = (req.body?.title ?? "").toString();
    const game = (req.body?.game ?? "").toString();

    const origin =
      req.body?.origin === "post" || req.body?.origin === "profile"
        ? req.body.origin
        : "profile";

    const bucket = getBucket();

    const uploadStream = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype,
      metadata: { userId },
    });

    uploadStream.end(file.buffer);

    uploadStream.on("finish", async () => {
      const created = await Video.create({
        userId,
        fileId: uploadStream.id.toString(),
        title: title.trim(),
        game: game.trim(),
        views: 0,
        origin,
        createdAt: new Date(),
      });

      return res.status(201).json(created);
    });

    uploadStream.on("error", (err) => {
      return res
        .status(500)
        .json({ message: "Upload failed", error: err.message });
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

videoRouter.get("/:videoId/file", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "No user in request" });

    const { videoId } = req.params;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Not found" });
    if (video.userId !== userId)
      return res.status(403).json({ message: "Forbidden" });

    if (!ObjectId.isValid(video.fileId)) {
      return res.status(500).json({ message: "Invalid fileId" });
    }

    const bucket = getBucket();

    res.setHeader("Content-Type", "video/mp4");

    const downloadStream = bucket.openDownloadStream(
      new ObjectId(video.fileId)
    );
    downloadStream.on("error", () => res.status(404).send("Not found"));
    downloadStream.pipe(res);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

videoRouter.delete("/:videoId", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "No user in request" });

    const { videoId } = req.params;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Not found" });
    if (video.userId !== userId)
      return res.status(403).json({ message: "Forbidden" });

    const bucket = getBucket();

    if (ObjectId.isValid(video.fileId)) {
      await bucket.delete(new ObjectId(video.fileId));
    }

    await Video.deleteOne({ _id: videoId });

    return res.status(200).json({ message: "Deleted", videoId });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});
