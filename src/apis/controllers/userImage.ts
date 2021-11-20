import { NextFunction, Request, RequestHandler, Response } from "express";
import mongoose from 'mongoose';
import { gfs } from '../../index';
import { userModel } from "../../Models/index";
import { sendError, UPDATE } from "../../utils";


export const validateFile = (req: Request, res: Response, next: NextFunction) => {
  const reqCopy: any = { ...req }
  if (req.hasOwnProperty("file_error")) {
    return sendError(
      res,
      422,
      reqCopy.file_error
    );
  }
  if (!req.file) {
    return sendError(
      res,
      422,
      'Please select an image.'
    );

  }
  next()
}

export const validateUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

  const userId = req.headers.userid

  const userExist = await userModel.findOne({ _id: new mongoose.Types.ObjectId(userId?.toString()) })
  if (!userExist) {
    return sendError(res, 404, "This user does not exist")
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