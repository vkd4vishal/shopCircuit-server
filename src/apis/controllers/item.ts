import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import { itemImageGfs } from "../../index";
import {
  categoryModel,
  itemModel,
  userModel,
  itemDetailSchemaType,
  categorySchemaType,
} from "../../Models/index";
import { CREATE, DELETE, GET, sendError, UPDATE } from "../../utils";

export const validateItemsWithCategory = async (
  items: string[],
  categoryId: string
) => {
  const [itemsRecord, category] = await Promise.all([
    validateItems(items),
    validateCategory(categoryId),
  ]);
  itemsRecord.forEach((item) => {
    if (item.category.toString() !== categoryId) {
      return sendError(
        500,
        `The item ${item.itemName} selected doesn't belong to the category ${category?.categoryName}`
      );
    }
  });
};
export const validateItemsWithSeller = async (
  items: string[],
  sellerId: string
) => {
  const itemsRecord = await validateItems(items);
  const seller = await validateSeller(sellerId);
  itemsRecord.forEach((item) => {
    // const record = await itemModel.findOne({
    //   sellerId: new mongoose.Types.ObjectId(sellerId?.toString()),
    //   _id: new mongoose.Types.ObjectId(itemId?.toString()),
    // });
    if (item.sellerId.toString() !== sellerId) {
      return sendError(
        500,
        `The selected item ${item?.itemName}  doesn't belong to the seller ${seller?.userName}`
      );
    }
  });
  return { itemsRecord, seller };
};

export const validateItems = async (items: string[]) => {
  const records = await itemModel.find({ _id: { $in: items } });
  console.log("records", records);
  if (records.length !== items.length) {
    items.forEach((item) => {
      if (!records.find((record) => record._id.toString() === item)) {
        return sendError(500, `Item with id ${item} doesn't exist`);
      }
    });
  }
  return records;
};
export const validateCategory = async (categoryId: string) => {
  const record = await categoryModel.findOne({
    _id: new mongoose.Types.ObjectId(categoryId?.toString()),
  });
  if (!record) {
    return sendError(500, "The selected category  doesn't exist");
  }
  return record;
};
export const validateSeller = async (sellerId: string) => {
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
    validateCategory(categoryid),
    validateItemsWithSeller([itemid], sellerid),
  ]);
  const result = await itemModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(itemid?.toString()) },
    { ...req.body, category: categoryid, sellerId: sellerid }
  );

  return UPDATE(res, { result }, "Item");
};
export const deleteItems: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const sellerid: any = req.headers.userid;
  const { items } = req.body;
  await validateItemsWithSeller(items, sellerid);
  items.forEach((itemId: string) => {
    itemImageGfs
      .find({ filename: itemId?.toString() + ".png" })
      .toArray((err: any, files: any) => {
        files.forEach((file: any) => {
          itemImageGfs.delete(file._id);
        });
      });
  });
  const result = await Promise.all(
    items.map(
      async (itemId: string) =>
        await itemModel.deleteOne({
          _id: new mongoose.Types.ObjectId(itemId?.toString()),
        })
    )
  );

  return DELETE(res, result, "Items");
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
    where = {
      ...where,
      $or: [
        { itemName: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ],
    };
  }
  const items = await itemModel.paginate(
    { ...where, $and: [{ ...filters }] },
    {
      sort: { [sort]: order },
      limit: limit,
      offset: limit * (page - 1),
      page: page,
      lean: true,
    }
  );

  const categoryIds = items.docs.map(
    (item: itemDetailSchemaType) => item.category
  );
  const categories = await categoryModel.find({ _id: { $in: categoryIds } });
  const data = items.docs.map((item: itemDetailSchemaType) => {
    const category = categories.find(
      (record: categorySchemaType) =>
        record._id.toString() === item.category.toString()
    );
    return { ...item, categoryName: category?.categoryName };
  });

  return GET(res, { data, totalDocs: items.totalDocs }, "Items");
};

export const getItemDetails: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const itemId = req.headers.itemid;

  const itemDetails = await itemModel.findOne({
    _id: new mongoose.Types.ObjectId(itemId?.toString()),
  });

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
};

export const getItemImage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const itemImageId = req.headers.itemimageid;
  function getImages() {
    return new Promise(function (resolve, reject) {
      itemImageGfs
        .find({ _id: new mongoose.Types.ObjectId(itemImageId?.toString()) })
        .toArray(function (err: any, files: any) {
          if (err) {
            return reject(err);
          }
          return resolve(files);
        });
    });
  }
  const itemImages: any = await getImages();
  if (!(itemImages && itemImages.length)) {
    return sendError(404, "Image not found.");
  }
  const stream = itemImageGfs.openDownloadStream( new mongoose.Types.ObjectId(itemImageId?.toString()));
  stream.pipe(res);

};
