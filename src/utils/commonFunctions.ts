import { NextFunction, Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import { itemModel, userModel } from "../Models";

export const validateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers.userid;

  const userExist = await userModel.findOne({
    _id: new mongoose.Types.ObjectId(userId?.toString()),
  });
  if (!userExist) {
    return res.status(404).send("This user does not exist");
  }
  next();
};
export const validateSeller: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers.userid;

  const seller = await userModel.findOne({
    _id: new mongoose.Types.ObjectId(userId?.toString()),
    isSeller: true,
  });
  if (!seller) {
    return res.status(404).send("Seller does not exist");
  }
  next();
};
export const validateCustomer: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers.userid;

  const customer = await userModel.findOne({
    _id: new mongoose.Types.ObjectId(userId?.toString()),
    isSeller: false,
  });
  if (!customer) {
    return res.status(404).send("Customer does not exist");
  }
  next();
};
export const validateItemWithSeller: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sellerId = req.headers.userid;
  const itemId = req.headers.itemid;

  const item = await itemModel.findOne({
    _id: new mongoose.Types.ObjectId(itemId?.toString()),
    sellerId,
  });
  if (!item) {
    return res.status(404).send("Item does not belong to current Seller.");
  }
  next();
};
export const validateItem: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const itemId = req.headers.itemid;

  const item = await itemModel.findOne({
    _id: new mongoose.Types.ObjectId(itemId?.toString())
  });
  if (!item) {
    return res.status(404).send("Item does not exist.");
  }
  next();
};
export const validateImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqCopy: any = { ...req };
  if (req.hasOwnProperty("file_error")) {
    return res.status(422).send(reqCopy.file_error);
  }
  if (!req.file) {
    return res.status(422).send("Please select an image.");
  }
  next();
};

export const validateMultipleImages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqCopy: any = { ...req };
  if (req.hasOwnProperty("file_error")) {
    return res.status(422).send(reqCopy.file_error);
  }
  if (!req.files || !req.files.length) {
    return res.status(422).send("Please select an image.");
  }
  next();
};