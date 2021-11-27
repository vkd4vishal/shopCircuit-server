import { NextFunction, Request, RequestHandler, Response } from "express";
import { userImageGfs } from '../../index';
import { UPDATE } from "../../utils";




export const updateUserImage: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers.userid
  const uploadedImage: any = req.file
  userImageGfs.find({ filename: userId?.toString() + '.png' }).toArray((err: any, files: any) => {

    files.forEach((file: any) => {
      if (file._id.toString() !== uploadedImage.id.toString()) {
        userImageGfs.delete(file._id)
      }
    })


  })
  return UPDATE(res, {}, 'User image')
};