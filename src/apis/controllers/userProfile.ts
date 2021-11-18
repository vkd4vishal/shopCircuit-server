import { Request, Response, RequestHandler } from "express";
import { userModel } from "../../Models/index";
import bcrypt from "bcrypt";
import { CREATE, sendError, GET } from "../../utils";
import mongoose from 'mongoose'
import { gfs } from '../../index'




export const signUp: RequestHandler = async (req: Request, res: Response) => {
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

export const getProfile: RequestHandler = async (req: Request, res: Response) => {
  const userId = req.headers.userid
  const userProfile = await userModel.findOne({ _id: new mongoose.Types.ObjectId(userId?.toString()) })
  if (!userProfile) {
    return sendError(res, 302, "This user does not exist")
  }
  // let image :any={details:'No Image'}

  gfs.find({ filename: userId?.toString() + '.png' })
    .toArray(function (err: any, files: any) {
      if (files && files.length) {
      }
    })
  // console.log('details',details)
  return GET(res, { userProfile }, "User Profile");
};
