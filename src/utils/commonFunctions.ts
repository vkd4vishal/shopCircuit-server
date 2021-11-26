import { NextFunction, Request, RequestHandler, Response } from "express";
import { sendError } from ".";
import { userModel } from "../Models";
import mongoose from 'mongoose'

export const validateUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers.userid
  
    const userExist = await userModel.findOne({ _id: new mongoose.Types.ObjectId(userId?.toString()) })
    if (!userExist) {
      return sendError(404, "This user does not exist")
    }
    next()
  
  };

  
export const validateFile = (req: Request, res: Response, next: NextFunction) => {
    const reqCopy: any = { ...req }
    if (req.hasOwnProperty("file_error")) {
      return sendError(
        422,
        reqCopy.file_error
      );
    }
    if (!req.file) {
      return sendError(
        422,
        'Please select an image.'
      );
  
    }
    next()
  }