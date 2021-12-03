import { Document, model, Schema } from "mongoose";

export interface otpSchemaType extends Document {
  otp: number;
  email: string;
}
var otpSchema = new Schema<otpSchemaType>(
  {
    otp: {
      type: Number,
      required: [true, "You must enter otp."],
      min: 1000,
      max: 9999
    },
    email: {
      type: String,
      minLength: 1,
      maxLength: 40,
      required: [true, "You must enter email."],
      index: { unique: true },
    },
  },
  {
    timestamps: true,
  }
);

// interface otpModel<T extends Document> {}
export const otpModel = model<otpSchemaType>("Otp", otpSchema);
