import User from "../models/userSchema.js";
import { type InferSchemaType } from "mongoose";
import { type UserDto } from "../models/userDTO.js";
import { type RegisterRequest } from "../routes/registerRoute.mjs";
import bcrypt from "bcryptjs";

type UserType = InferSchemaType<typeof User.schema>;

export const convertDbUserToDto = (dbUser: UserType): UserDto => {
  return { username: dbUser.name, email: dbUser.email } satisfies UserDto;
};

export const creatUser = async (data: RegisterRequest) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(data.password, salt);

  const newUser = await User.create({
    name: data.name,
    email: data.email,
    password: hashed,
  });
  return convertDbUserToDto(newUser);
};
