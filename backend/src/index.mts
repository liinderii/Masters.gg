import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { registerRouter } from "./routes/registerRoute.mjs";
import { loginRouter } from "./routes/loginRoute.mjs";
import cookieParser from "cookie-parser";
import { auth } from "./middlewares/auth.mjs";
import cors from "cors";
dotenv.config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGO_URL;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
if (!dbUrl) throw Error("No MONGO_URL in env file");

if (!dbUrl) throw Error("No MONGO_URL in env file");

const app = express();

app.use(json());
app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(cookieParser());

app.get("/ping", (_, res) => {
  res.status(200).json({ status: "I'm alive" });
});

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use(auth);

app.listen(port, async () => {
  await mongoose.connect(dbUrl);
  console.log("Api is up and running, connected to database");
});
