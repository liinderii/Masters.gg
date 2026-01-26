import express from "express";
import { login, issueLoginCookie } from "../controllers/loginController.mjs";

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Missing login information" });
    }

    const loggedInUser = await login(email, password);

    if (!loggedInUser) {
      return res.status(400).json({ message: "Incorrect email/password" });
    }

    // 🔑 ENDA stället där cookie sätts
    issueLoginCookie(req, res, loggedInUser);

    return res.status(200).json(loggedInUser);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
