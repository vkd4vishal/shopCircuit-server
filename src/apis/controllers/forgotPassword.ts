import { Request, RequestHandler, Response } from "express";
import { otpModel, userModel } from "../../Models";
import { sendError, CREATE,UPDATE } from "../../utils";
import { sendEmail } from "../commonFunctions/commonFunctions";

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
  const generatedOtp = Math.floor(1000 + Math.random() * 9000);
  await sendEmail(
    user.email,
    "ShopCircuit- Forgot Password",
    `Your one time password is ${generatedOtp} and is valid for next 30 minutes.`
  );
  await otpModel.findOneAndUpdate({email: user.email},{otp: generatedOtp}, { upsert : true })
  return CREATE(res, {}, "OTP");
};

export const validateOtp: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { userName, email,otp } = req.body;
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
  const otpRecord = await otpModel.findOne({email:user.email})
  if(otpRecord?.otp !== otp  ){
    return sendError(400, "Invalid OTP entered.");
  }

  return UPDATE(res, {}, "");
};