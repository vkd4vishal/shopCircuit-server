import bcrypt from "bcrypt";
import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { otpModel, userModel } from "../../Models";
import { CREATE, sendError, UPDATE } from "../../utils";
import { sendEmail, validateOtp } from "../commonFunctions/commonFunctions";
export const sendOtpToMail: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { userName, email } = req.body;
  let user;
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
  const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
  const hashedOtp = await bcrypt.hash(generatedOtp, 10);
  await sendEmail(
    user.email,
    "ShopCircuit- Forgot Password",
    `Your one time password is ${generatedOtp} and is valid for next 30 minutes.`
  );
  await otpModel.findOneAndUpdate(
    { email: user.email },
    { otp: hashedOtp },
    { upsert: true }
  );
  return CREATE(res, {}, "OTP");
};

export const validateEmailOtp: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { userName, email, otp } = req.body;
  let user;
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
  await validateOtp(user.email, otp);
  const payload = {
    user: {
      id: user._id.toString(),
    },
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET ?? "", {
    expiresIn: "10h",
  });
  return UPDATE(res, { userId: user._id, token }, "");
};

export const forgotPassword: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userId = req.headers.userid;
  const {password}=req.body
  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.findByIdAndUpdate(userId,{password:hashedPassword})
  return UPDATE(res, {}, "Password");
};

export const changePassword: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userId = req.headers.userid;
  const {oldPassword,newPassword}=req.body
  const user = await userModel.findById(userId)
  if (!user) {
    return sendError(404, "User not found.");
  }
  const isValidPassword = await bcrypt.compare(oldPassword, user.password);
  if (!isValidPassword) {
    return sendError(401, "Invalid Old Password.");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await userModel.findByIdAndUpdate(userId,{password:hashedPassword})
  return UPDATE(res, {}, "Password");
};
