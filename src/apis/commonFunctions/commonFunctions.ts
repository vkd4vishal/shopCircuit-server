import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { otpModel } from "../../Models";
import { sendError } from "../../utils";
export const sendEmail = async (
  email: string,
  subject: string,
  text: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE ?? "demo",
      port: Number(process.env.MAIL_PORT),
      secure: true,
      name: process.env.MAIL_NAME ?? "demo",
      host: process.env.MAIL_HOST ?? "demo",
      auth: {
        user: process.env.MAIL_USER ?? "demo",
        pass: process.env.MAIL_PASSWORD ?? "demo",
      },
    });
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject,
      text,
    });
  } catch (error) {
    return sendError(500, "Could not send mail.");
  }
};

export const validateOtp = async (email: string, otp: number) => {
  const otpRecord = await otpModel.findOne({ email });
  if (!otpRecord) {
    return sendError(404, "OTP does not exist.");
  }
  const isValidOtp=await bcrypt.compare(otp.toString(),otpRecord?.otp )
  if (!isValidOtp) {
    return sendError(400, "Invalid OTP entered.");
  }
  const currentDate = +new Date();
  const updatedAt = +new Date(otpRecord.updatedAt);
  const msDifference = currentDate - updatedAt;
  const minutes = Math.floor(msDifference / 1000 / 60);
  if (minutes > 30) {
    return sendError(400, "OTP expired.");
  }
  await otpModel.findOneAndDelete({ email });
};
