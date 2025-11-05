import express from "express";
import { creatUser } from "../controllers/registerController.mjs";

export const registerRouter = express.Router();

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

registerRouter.post("/", async (req, res) => {
  try {
    const { name, email, password }: RegisterRequest = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      const newUser = await creatUser({ name, email, password });
      return res.status(201).json(newUser);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
