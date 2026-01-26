import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { convertDbUserToDto } from "./registerController.mjs";
import { type Request, type Response } from "express";
import { type UserDto } from "../models/userDTO.js";

export const issueLoginCookie = (
  req: Request,
  res: Response,
  userDto: UserDto
) => {
  const token = jwt.sign(userDto, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  // Render + Cloudflare + trust proxy
  const isHttps = req.secure || req.header("x-forwarded-proto") === "https";

  res.cookie("login", token, {
    httpOnly: true,
    secure: isHttps, // TRUE i production
    sameSite: isHttps ? "none" : "lax",
    maxAge: 60 * 60 * 1000,
    path: "/",
  });
};

export const login = async (email: string, password: string) => {
  const foundUser = await User.findOne({ email });

  if (!foundUser) return null;

  const success = await bcrypt.compare(password, foundUser.password);
  if (!success) return null;

  return convertDbUserToDto(foundUser);
};
