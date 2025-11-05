import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { convertDbUserToDto } from "./registerController.mjs";
import { type Response } from "express";
import { type UserDto } from "../models/userDTO.js";

export const issueLoginCookie = (res: Response, userDto: UserDto) => {
  const token = jwt.sign(userDto, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  res.cookie("login", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
    path: "/",
  });
};

export const login = async (email: string, password: string) => {
  const foundUser = await User.findOne({ email: email });

  if (!foundUser) return null;

  // password -> foundUser.password

  const success = await bcrypt.compare(password, foundUser.password);
  if (success) {
    return convertDbUserToDto(foundUser);
  } else {
    return null;
  }
};
