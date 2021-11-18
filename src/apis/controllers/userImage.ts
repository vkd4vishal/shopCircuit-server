import { Request, Response, RequestHandler, NextFunction } from "express";
import { userModel, userProfileImagesModel } from "../../Models/index";
import mongoose from 'mongoose'
import { CREATE, sendError, UPDATE } from "../../utils";
import { gfs } from '../../index'
import { upload } from "../validators";


export const validateFile = (req: Request, res: Response) => {
  console.log("VALIDATE FILE");

  if (!req.file) {
    return sendError(res,442,'Please select an image.')
  }
  const reqCopy: any = { ...req }
  if (req.hasOwnProperty("file_error")) {
    return sendError(
      res,
      442,
      reqCopy.file_error
    );
  }
  return CREATE(res, {}, 'User image')
}

export const uploadUserImage: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  console.log("UPLOAD USER IMAGE ");
  // validateFile(req, res)
  const userId = req.headers.userid
  const userExist = await userModel.findOne({ _id: new mongoose.Types.ObjectId(userId?.toString()) })

  if (!userExist) {
    return sendError(res, 302, "This user does not exist")
  }

  next()

  // await userProfileImagesModel.findOneAndUpdate({ filename: id?.toString() }, { filename: id?.toString() })
  // return UPDATE(res, 200, "User Image is created successfully!");
};

export const updateUserImage: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  console.log("UPDATE USER IMAGE");
  let isImage = true;
  // validateFile(req, res)
  const userId = req.headers.userid
  const userExist = await userModel.findOne({ _id: new mongoose.Types.ObjectId(userId?.toString()) })
  if (!userExist) {
    return sendError(res, 302, "This user does not exist")
  }


  gfs.find({ filename: userId?.toString() + '.png' }).toArray((err: any, files: any) => {
    // Check if files
    if (!files || files.length === 0) {
      isImage = false
    } else {
      gfs.delete(files[0]._id)
    }
  })
  if (!isImage) { return sendError(res, 500, `Image not found.`) }
  console.log("ek line pehle");
  
  next()

};