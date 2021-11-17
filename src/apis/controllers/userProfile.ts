import { Request, Response, RequestHandler } from "express";
import { userModel } from "../../Models/index";
import bcrypt from "bcrypt";
import Joi from "joi";
import { userSchema } from "../validators";
import { CREATE, sendError } from "../../utils";


export const signUp: RequestHandler = async (req: Request, res: Response) => {
  console.log('signUp')
  if (req.hasOwnProperty("file_error")) {
    return sendError(
      res,
      442,
      "Only jpeg and png format are allowed for the image."
    );
  }
  const { userName, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const record = await userModel.findOne({ userName });
  if (record) {
    return sendError(res, 500, "Username already exists.");
  }
  let newUser = new userModel({ ...req.body, password: hashedPassword });
  const result = await newUser.save();
  return CREATE(res, result, "User Profile");
};
