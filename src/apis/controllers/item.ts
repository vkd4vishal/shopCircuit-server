import { Request, Response, RequestHandler } from "express";
import { itemModel, categoryModel, userModel } from "../../Models/index";
import { CREATE, sendError, GET, DELETE, UPDATE } from "../../utils";
import mongoose from "mongoose";
import { gfs } from "../../index";
import jwt from "jsonwebtoken";

export const validateItemWithCategory = async (
  itemId: string,
  categoryId: string,
  res: any
) => {
  // validate item
  const record1 = await itemModel.findOne({
    _id: new mongoose.Types.ObjectId(itemId?.toString()),
  });
  if (!record1) {
    return sendError(res, 500, "The item selected doesn't exist");
  }
  const record2 = await categoryModel.findOne({
    _id: new mongoose.Types.ObjectId(categoryId?.toString()),
  });
  if (!record2) {
    return sendError(res, 500, "The category selected doesn't exist");
  }
  // validate Category
  const record = await itemModel.findOne({
    category: new mongoose.Types.ObjectId(itemId?.toString()),
    _id: new mongoose.Types.ObjectId(itemId?.toString()),
  });
  if (!record) {
    return sendError(
      res,
      500,
      `The item ${record1.itemName} selected doesn't belong to the category ${record2.categoryName}`
    );
  }
};
export const validateItemWithSeller = async (
  itemId: string,
  sellerId: string,
  res: any
) => {
  // validate item
  const record1 = await itemModel.findOne({
    _id: new mongoose.Types.ObjectId(itemId?.toString()),
  });
  if (!record1) {
    return sendError(res, 500, "The item selected doesn't exist");
  }
  const record2 = await userModel.findOne({
    _id: new mongoose.Types.ObjectId(sellerId?.toString()),
  });
  if (!record2) {
    return sendError(res, 500, "The seller selected doesn't exist");
  }
  const record = await itemModel.findOne({
    sellerId: new mongoose.Types.ObjectId(sellerId?.toString()),
    _id: new mongoose.Types.ObjectId(itemId?.toString()),
  });
  if (!record) {
    return sendError(
      res,
      500,
      `The item ${record1.itemName} selected doesn't belong to the category ${record2.categoryName}`
    );
  }
};
// export const validateItem=async (itemId:any)=>{

// }
// export const validateCategory=async (itemId:any)=>{

// }
export const updateItemDetails: RequestHandler = async (
  req: Request,
  res: Response
) => {
    const headers:any=req.headers
  const {
    itemid,
    categoryid,
    sellerid,
  }: { itemid: string; categoryid: string; sellerid: string } = headers;

  //   step 1- validate itemid
  // step-2-validate categoryid
  // step 3-validate sellerid(sanghsrsh)
  // step 4-check category id and itemid relation,
  // step 5-check sellerid id and itemid relation,
  await Promise.all([
    validateItemWithCategory(itemid, categoryid, res),
    validateItemWithSeller(itemid, sellerid, res),
  ]);
  const result = await itemModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(itemid?.toString()) },
    { ...req.body }
  );

  return UPDATE(res, result, "Item");
};
export const deleteItemDetails: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
      const headers:any=req.headers
    const {
      itemid,
      sellerid,
    }: { itemid: string; sellerid: string } = headers;
  
    await validateItemWithSeller(itemid, sellerid, res)
    const result=await itemModel.deleteOne({ _id: new mongoose.Types.ObjectId(itemid?.toString()) })

    return DELETE(res, result, "Item");
  }

export const addItemDetails: RequestHandler = async (req: Request, res: Response) => {
    const { sellerId } = req.headers;
    const record = await userModel.findOne({ userId: sellerId, isSeller: true });
    if(!record){
        return sendError(res, 406, "You are not a seller" )
    }

    let newItem = new itemModel({...req.body,sellerId})
    const result = await newItem.save();
    return CREATE(res, result, "Item");
};
