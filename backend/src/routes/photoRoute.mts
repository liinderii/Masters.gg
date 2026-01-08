import express from "express";
import mongoose from "mongoose";
import { GridFSBucket, ObjectId } from "mongodb";
import Photo from "../models/photoSchema.js";
import { uploadPhoto } from "../middlewares/uploadphoto.js";

export const photoRouter = express.Router();

function getBucket() {
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB not connected");
  return new GridFSBucket(db, { bucketName: "photos" });
}

photoRouter.get("/", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "No user in request" });

    const photos = await Photo.find({ userId, origin: "profile" }).sort({
      createdAt: -1,
    });

    return res.status(200).json(photos);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

photoRouter.post("/", uploadPhoto.single("file"), async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "No user in request" });

    const file = req.file;
    const caption = (req.body?.caption ?? "").toString();

    const origin =
      req.body?.origin === "post" || req.body?.origin === "profile"
        ? req.body.origin
        : "profile";

    if (!file) return res.status(400).json({ message: "No file provided" });

    const bucket = getBucket();
    const filename = file.originalname || "upload";

    const uploadStream = bucket.openUploadStream(filename, {
      contentType: file.mimetype,
      metadata: { userId },
    });

    uploadStream.end(file.buffer);

    uploadStream.on("finish", async () => {
      const created = await Photo.create({
        userId,
        fileId: uploadStream.id.toString(),
        caption: caption.trim(),
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

photoRouter.get("/:photoId/file", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "No user in request" });

    const { photoId } = req.params;
    const photo = await Photo.findById(photoId);

    if (!photo) return res.status(404).json({ message: "Not found" });
    if (photo.userId !== userId)
      return res.status(403).json({ message: "Forbidden" });

    const bucket = getBucket();

    if (!ObjectId.isValid(photo.fileId)) {
      return res.status(500).json({ message: "Invalid fileId stored" });
    }

    const downloadStream = bucket.openDownloadStream(
      new ObjectId(photo.fileId)
    );
    downloadStream.on("error", () => res.status(404).send("Not found"));
    downloadStream.pipe(res);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

photoRouter.delete("/:photoId", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) {
      return res.status(401).json({ message: "No user in request" });
    }

    const { photoId } = req.params;

    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).json({ message: "Not found" });
    }

    if (photo.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const bucket = getBucket();

    if (ObjectId.isValid(photo.fileId)) {
      await bucket.delete(new ObjectId(photo.fileId));
    } else {
      console.warn("Invalid GridFS fileId:", photo.fileId);
    }

    await Photo.deleteOne({ _id: photoId });

    return res.status(200).json({ message: "Deleted", photoId });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});
