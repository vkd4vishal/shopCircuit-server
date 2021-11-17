import { Request, Response, RequestHandler } from "express";
import { userModel, userProfileImagesModel } from "../../Models/index";
import mongoose from 'mongoose'
import bcrypt from "bcrypt";
import { CREATE, sendError } from "../../utils";

export const uploadUserImage: RequestHandler = async (req: Request, res: Response) => {
  if (!req.file) {
    return sendError(res, 442, 'Please select a photo.')
  }
  console.log(req.file)

  const { id } = req.query;
  if (req.hasOwnProperty("file_error")) {
    return sendError(
      res,
      442,
      "Only jpeg and png format are allowed for the image."
    );
  }
  const record = await userModel.findOne({
    _id: new mongoose.Types.ObjectId(id?.toString())
  })
  if (!record) {
    await userProfileImagesModel.deleteOne({ _id: new mongoose.Types.ObjectId(id?.toString()) })
    return sendError(res, 500, `User not found.`)
  }
  console.log('record',record)
  const uploadImage: any = req.file
  console.log('img', uploadImage.id.ObjectId)
  // await userProfileImagesModel.findOneAndUpdate({_id:req.file.id},{filename:id})

  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const record = await userModel.findOne({ userName });
  //   if (record) {
  //     return sendError(res, 500, "Username already exists.");
  //   }
  //   let newUser = new userModel({ ...req.body, password: hashedPassword });
  //   const result = await newUser.save();
  return CREATE(res, {}, "User Image uploaded");
};
