import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import { itemImageGfs } from "../../index";
import { categoryModel, itemModel, userModel } from "../../Models/index";
import { CREATE, DELETE, GET, sendError, UPDATE } from "../../utils";

export const validateItemWithCategory = async (
  itemId: string,
  categoryId: string,
  res: any
) => {
  const [item, category] = await Promise.all([
    validateItem(itemId, res),
    validateCategory(categoryId, res),
  ]);

  const record = await itemModel.findOne({
    category: new mongoose.Types.ObjectId(categoryId?.toString()),
    _id: new mongoose.Types.ObjectId(itemId?.toString()),
  });
  if (!record) {
    return sendError(
      500,
      `The item ${item?.itemName} selected doesn't belong to the category ${category?.categoryName}`
    );
  }
};
export const validateItemWithSeller = async (
  itemId: string,
  sellerId: string,
  res: any
) => {
  const item = await validateItem(itemId, res);
  const seller = await validateSeller(sellerId, res);

  const record = await itemModel.findOne({
    sellerId: new mongoose.Types.ObjectId(sellerId?.toString()),
    _id: new mongoose.Types.ObjectId(itemId?.toString()),
  });
  if (!record) {
    return sendError(
      500,
      `The selected item ${item?.itemName}  doesn't belong to the seller ${seller?.userName}`
    );
  }
  return { record, item, seller };
};
export const validateItem = async (itemId: string, res: Response) => {
  const record = await itemModel.findOne({
    _id: new mongoose.Types.ObjectId(itemId?.toString()),
  });
  if (!record) {
    return sendError(500, "The item selected doesn't exist");
  }
  return record;
};
export const validateCategory = async (categoryId: string, res: Response) => {
  const record = await categoryModel.findOne({
    _id: new mongoose.Types.ObjectId(categoryId?.toString()),
  });
  if (!record) {
    return sendError(500, "The selected category  doesn't exist");
  }
  return record;
};
export const validateSeller = async (sellerId: string, res: Response) => {
  const record = await userModel.findOne({
    _id: new mongoose.Types.ObjectId(sellerId?.toString()),
    isSeller: true,
  });
  if (!record) {
    return sendError(500, "The seller selected doesn't exist");
  }
  return record;
};
export const updateItemDetails: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const headers: any = req.headers;
  const {
    itemid,
    categoryid,
    userid,
  }: { itemid: string; categoryid: string; userid: string } = headers;
  const sellerid = userid;
  await Promise.all([
    validateItemWithCategory(itemid, categoryid, res),
    validateItemWithSeller(itemid, sellerid, res),
  ]);
  const result = await itemModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(itemid?.toString()) },
    { ...req.body, category: categoryid, sellerId: sellerid }
  );

  return UPDATE(res, { result }, "Item");
};
export const deleteItem: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const headers: any = req.headers;
  const { itemid, userid }: { itemid: string; userid: string } = headers;
  const sellerid = userid;
  await validateItemWithSeller(itemid, sellerid, res);
  itemImageGfs
    .find({ filename: itemid?.toString() + ".png" })
    .toArray((err: any, files: any) => {
      files.forEach((file: any) => {
        itemImageGfs.delete(file._id);
      });
    });
  const result = await itemModel.deleteOne({
    _id: new mongoose.Types.ObjectId(itemid?.toString()),
  });

  return DELETE(res, result, "Item");
};

export const addItemDetails: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const sellerId = req.headers.userid;
  const record = await userModel.findOne({ userId: sellerId, isSeller: true });
  if (!record) {
    return sendError(406, "You are not a seller");
  }
  
  let newItem = new itemModel({
    ...req.body,
    sellerId,
    category: req.headers.categoryid,
  });
  const result = await newItem.save();
  return CREATE(res, result, "Item");
};
interface getItemsQuery {
  page: number;
  limit: number;
  sort: string;
  order: number;
  search: string;
  filters: any;
}
export const getItems: RequestHandler = async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 30,
    sort = "itemName",
    order = 1,
    search = "",
    ...filters
  } = req.query as unknown as getItemsQuery;
  let where = {};
  if (search) {
    where = { ...where, $text: { $search: `${search}` } };
  }
  const data = await itemModel.paginate(
    { ...where, ...filters },
    {
      sort: { [sort]: order },
      limit: limit,
      offset: limit * (page - 1),
      page: page,
    }
  );
  return GET(res, { data }, "Items");
};

export const getItemDetails: RequestHandler = async (req: Request, res: Response) => {
  const itemId = req.headers.itemid

  const itemDetails = await itemModel.findOne({
    _id: new mongoose.Types.ObjectId(itemId?.toString())
  })

  function getImages() {
    return new Promise(function (resolve, reject) {
      itemImageGfs
        .find({ filename: itemId?.toString() + ".png" })
        .toArray(function (err: any, files: any) {
          if (err) {
            return reject(err);
          }
          return resolve(files);
        });
    });
  }
  const itemImages: any = await getImages();
  return GET(res, { itemDetails, itemImages }, "Items and its Images");
}
