import { Request, Response, RequestHandler } from "express";
import { userModel, userProfileImagesModel } from "../../Models/index";
import mongoose from 'mongoose'
import { sendError, UPDATE } from "../../utils";
import { gfs } from '../../index'


const validateFile = (req: Request, res: Response) => {
  if (!req.file) {
    return sendError(res, 442, 'Please select a photo.')
  }

  if (req.hasOwnProperty("file_error")) {
    return sendError(
      res,
      442,
      "Only jpeg and png format are allowed for the image."
    );
  }
}

export const uploadUserImage: RequestHandler = async (req: Request, res: Response) => {
  console.log('entered')
  const { id } = req.query;
  validateFile(req, res)
  const record = await userModel.findOne({
    _id: new mongoose.Types.ObjectId(id?.toString())
  })

  // const image = await userProfileImagesModel.find({
  //   // filename: id?.toString()
  // })
  //   gfs.find().toArray((err: any, files: any) => {
  //     // Check if files
  //     if (!files || files.length === 0) {
  //         // res.render('index', { files: false });
  //         return res.send('No Images found')
  //         console.log(err)
  //     } else {
  //         const file = files[1]
  //         console.log('file',file)
  //     }
  // });
  gfs.find({ filename: id?.toString()+'.jpeg' }).toArray((err: any, files: any) => {
    // Check if files
    if (!files || files.length === 0) {
      // res.render('index', { files: false });
      return sendError(res, 500, `Image not found.`)
    } else {
      files.forEach((image:any) => {

        console.log('img', image)
      });
    }
  })
  const uploadImage: any = req.file
  const uploadedImageId = uploadImage.id.toString() 
  console.log('uploadedImageId',uploadedImageId)
  console.log('gfs',gfs)
  if (!record) {
    // await userProfileImagesModel.deleteOne({ filename: id?.toString() })
    // gfs.remove({_id:uploadedImageId})
    gfs.delete({ id:new mongoose.Types.ObjectId(uploadedImageId) }, (err:any) => {
      if (err) console.log('err',err)
      console.log('ssuecs')
  })
    return sendError(res, 500, `User not found.`)
  }
 

  // await userProfileImagesModel.findOneAndUpdate({ filename: id?.toString() }, { filename: id?.toString() })
  return UPDATE(res, {}, "User Image");
};
