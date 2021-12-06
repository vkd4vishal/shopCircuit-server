import bcrypt from "bcrypt";
import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { userImageGfs } from "../../index";
import { userModel } from "../../Models/index";
import { CREATE, DELETE, GET, sendError, UPDATE } from "../../utils";

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  const { userName, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const record = await userModel.findOne({ userName });
  if (record) {
    return sendError(403, "Username already exists.");
  }
  const emailRecord = await userModel.findOne({ email });
  if (emailRecord) {
    return sendError(403, "Email already used.");
  }
  let newUser = new userModel({ ...req.body, password: hashedPassword });
  const result = await newUser.save();
  return CREATE(res, result, "User Profile");
};

export const getProfile: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userId = req.headers.userid;
  const userProfile = await userModel.findOne({
    _id: new mongoose.Types.ObjectId(userId?.toString()),
  }).select(' userName email firstName lastName address isSeller aadharNumber')
  if (!userProfile) {
    return sendError(404, "This user does not exist");
  }
  //removing password from the object so that it is not returned to the response
  // let userProfile:{password?:string}=record
  // delete userProfile.password //@TODO: to be fixed

  function getImages() {
    return new Promise(function (resolve, reject) {
      userImageGfs
        .find({ filename: userId?.toString() + ".png" })
        .toArray(function (err: any, files: any) {
          if (err) {
            return reject(err);
          }
          return resolve(files);
        });
    });
  }
  const userImage: any = await getImages();
  // console.log('image',  userImageGfs.openDownloadStreamByName(userImage.filename)) //don't remove this code. will be needed during UI development
  return GET(res, { userProfile, userImage }, "User Profile");
};

export const updateUserProfile: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { userName, email } = req.body;
  const userId = req.headers.userid;
  const record = await userModel.findOne({
    userName,
    _id: { $ne: new mongoose.Types.ObjectId(userId?.toString()) },
  });
  if (record) {
    return sendError(403, "Username already exists.");
  }
  const emailRecord = await userModel.findOne({
    email,
    _id: { $ne: new mongoose.Types.ObjectId(userId?.toString()) },
  });
  if (emailRecord) {
    return sendError(403, "Email already used.");
  }
  const result = await userModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(userId?.toString()) },
    { ...req.body }
  );
  return UPDATE(res, result, "User Profile");
};

export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userId = req.headers.userid;
  await userModel.deleteOne({
    _id: new mongoose.Types.ObjectId(userId?.toString()),
  });

  userImageGfs
    .find({ filename: userId?.toString() + ".png" })
    .toArray((err: any, files: any) => {
      files.forEach((file: any) => {
        userImageGfs.delete(file._id);
      });
    });
  // @TODO: item Images to be deleted related to the seller

  return DELETE(res, {}, "User Profile");
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  const { userName, password, email } = req.body;
  let user = undefined;
  if (userName) {
    user = await userModel.findOne({ userName });
    if (!user) {
      return sendError(404, "Username does not exist.");
    }
  } else {
    user = await userModel.findOne({ email });
    if (!user) {
      return sendError(404, "Email does not exist.");
    }
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return sendError(401, "Invalid Password.");
  }

  const payload = {
    user: {
      id: user._id.toString(),
    },
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET ?? "", {
    expiresIn: "10h",
  });
  return UPDATE(
    res,
    {
      token,
    },
    ""
  );
};

// export const logout: RequestHandler = async (req: Request, res: Response) => {

//   jwt.sign(req.headers.token ?? '', "", { expiresIn: 1 }, (logout, err) => {
//     if (logout) {
//       res.send({ msg: 'You have been Logged Out' });
//     } else {
//       res.send({err});
//     }
//     return UPDATE(res, {
//     }, "Logged out");
//   })
// }
