import { Router } from "express";
import mongoose from "mongoose";
import User from "../models/userSchema.js";
import FriendRequest from "../models/friendRequestSchema.js";

export const friendsRouter = Router();

friendsRouter.get("/", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const me = await User.findById(userId)
      .populate("friends", "name email")
      .lean();

    if (!me) return res.status(404).json({ message: "User not found" });

    const friends = (me.friends ?? []).map((u: any) => ({
      _id: u._id,
      name: u.name,
      email: u.email,
      isOnline: false,
    }));

    res.json(friends);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to fetch friends" });
  }
});

friendsRouter.get("/requests", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const requests = await FriendRequest.find({
      toUserId: new mongoose.Types.ObjectId(userId),
      status: "pending",
    })
      .populate("fromUserId", "name email")
      .sort({ createdAt: -1 })
      .lean();

    const mapped = requests.map((r: any) => ({
      _id: r._id,
      fromUser: {
        _id: r.fromUserId._id,
        name: r.fromUserId.name,
        email: r.fromUserId.email,
      },
      createdAt: r.createdAt,
    }));

    res.json(mapped);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
});

friendsRouter.get("/search", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const q = String(req.query.query ?? "").trim();
    if (!q) return res.json([]);

    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

    const users = await User.find({
      _id: { $ne: userId },
      $or: [{ name: regex }, { email: regex }],
    })
      .select("_id name email")
      .limit(20)
      .lean();

    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Search failed" });
  }
});

friendsRouter.post("/request", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const toUserId = String(req.body?.toUserId ?? "");
    if (!mongoose.Types.ObjectId.isValid(toUserId)) {
      return res.status(400).json({ message: "Invalid toUserId" });
    }
    if (toUserId === userId) {
      return res.status(400).json({ message: "Cannot friend yourself" });
    }

    const me = await User.findById(userId).select("friends").lean();
    if (!me) return res.status(404).json({ message: "User not found" });

    const alreadyFriends = (me.friends ?? [])
      .map((id: any) => id.toString())
      .includes(toUserId);
    if (alreadyFriends) {
      return res.status(409).json({ message: "Already friends" });
    }

    const reversePending = await FriendRequest.findOne({
      fromUserId: new mongoose.Types.ObjectId(toUserId),
      toUserId: new mongoose.Types.ObjectId(userId),
      status: "pending",
    });

    if (reversePending) {
      reversePending.status = "accepted";
      await reversePending.save();

      await User.updateOne(
        { _id: userId },
        { $addToSet: { friends: new mongoose.Types.ObjectId(toUserId) } }
      );
      await User.updateOne(
        { _id: toUserId },
        { $addToSet: { friends: new mongoose.Types.ObjectId(userId) } }
      );

      return res.status(201).json({ status: "accepted" });
    }

    const created = await FriendRequest.create({
      fromUserId: new mongoose.Types.ObjectId(userId),
      toUserId: new mongoose.Types.ObjectId(toUserId),
      status: "pending",
    });

    return res.status(201).json({ status: "pending", requestId: created._id });
  } catch (e: any) {
    if (e?.code === 11000) {
      return res.status(409).json({ message: "Request already sent" });
    }
    console.error(e);
    res.status(500).json({ message: "Failed to send request" });
  }
});

friendsRouter.post("/requests/:id/accept", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid request id" });
    }

    const fr = await FriendRequest.findById(id);
    if (!fr) return res.status(404).json({ message: "Not found" });

    if (fr.toUserId.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (fr.status !== "pending") {
      return res.status(409).json({ message: "Request already handled" });
    }

    fr.status = "accepted";
    await fr.save();

    await User.updateOne(
      { _id: fr.fromUserId },
      { $addToSet: { friends: fr.toUserId } }
    );
    await User.updateOne(
      { _id: fr.toUserId },
      { $addToSet: { friends: fr.fromUserId } }
    );

    return res.json({ message: "Accepted" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to accept request" });
  }
});

friendsRouter.post("/requests/:id/decline", async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid request id" });
    }

    const fr = await FriendRequest.findById(id);
    if (!fr) return res.status(404).json({ message: "Not found" });

    if (fr.toUserId.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (fr.status !== "pending") {
      return res.status(409).json({ message: "Request already handled" });
    }

    fr.status = "declined";
    await fr.save();

    return res.json({ message: "Declined" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to decline request" });
  }
});
