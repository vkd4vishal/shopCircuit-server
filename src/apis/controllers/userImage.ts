import { Request, Response, RequestHandler, NextFunction } from "express";
import { userModel, userProfileImagesModel } from "../../Models/index";
import mongoose from 'mongoose'
import { CREATE, sendError, UPDATE } from "../../utils";
import { gfs } from '../../index'
import { upload } from "../validators";


export const validateFile = (req: Request, res: Response, next: NextFunction) => {
  const reqCopy: any = { ...req }
  if (req.hasOwnProperty("file_error")) {
    return sendError(
      res,
      442,
      reqCopy.file_error
    );
  }
  if (!req.file) {
    return sendError(
      res,
      442,
      'Please select an image.'
    );

  }
  next()
}

export const validateUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  
  const userId = req.headers.userid

  const userExist = await userModel.findOne({ _id: new mongoose.Types.ObjectId(userId?.toString()) })
  if (!userExist) {
    return sendError(res, 302, "This user does not exist")
  }
  next()

};
export const updateUserImage: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers.userid
  const uploadedImage: any = req.file
  gfs.find({ filename: userId?.toString() + '.png' }).toArray((err: any, files: any) => {

    files.forEach((file: any) => {
      if (file._id.toString() !== uploadedImage.id.toString()) {
        gfs.delete(file._id)
      }
    })


  })
  return UPDATE(res, {}, 'User image')
};