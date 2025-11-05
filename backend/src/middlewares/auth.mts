import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { type UserDto } from "../models/userDTO.js";
import User from "../models/userSchema.js";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const loginCookie = req.cookies["login"];

  if (!loginCookie) {
    return res.status(401).end();
  }

  try {
    const result = jwt.verify(
      loginCookie,
      process.env.JWT_SECRET as string
    ) as UserDto;

    if (!result) {
      return res.status(401).end();
    }

    const theUser: UserDto = result;
    const userFromDb = await User.findOne({ email: theUser.email });

    if (userFromDb) {
      return next();
    } else {
      return res.status(403).send("Faking a user are we???");
    }
  } catch {
    // Ogiltig eller utgången token
    return res.status(401).end();
  }
};
