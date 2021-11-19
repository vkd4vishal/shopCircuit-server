import { Request, Response, RequestHandler } from "express";
import { userModel } from "../../Models/index";
import bcrypt from "bcrypt";
import { CREATE, sendError, GET, DELETE } from "../../utils";
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

  function getImages() {
    return new Promise(function (resolve, reject) {
      gfs.find({ filename: userId?.toString() + '.png' })
        .toArray(function (err: any, files: any) {
          if (err) {
            return reject(err)
          }
          return resolve(files)
        })
    })
  }
  const userImage: any = await getImages()
  // console.log('image',  gfs.openDownloadStreamByName(userImage.filename)) //don't remove this code. will be needed during UI development
  return GET(res, { userProfile, userImage }, "User Profile");
};

export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
  const userId = req.headers.userid
  await userModel.deleteOne({ _id: new mongoose.Types.ObjectId(userId?.toString()) })

  gfs.find({ filename: userId?.toString() + '.png' }).toArray((err: any, files: any) => {
    files.forEach((file: any) => {
      gfs.delete(file._id)
    })
  })
  return DELETE(res, {}, "User Profile");
};