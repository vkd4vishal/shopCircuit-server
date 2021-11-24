import { Request, Response, RequestHandler } from "express";
import { itemModel, categoryModel, userModel,itemDetailSchemaType } from "../../Models/index";
import { CREATE, sendError, GET, DELETE, UPDATE } from "../../utils";
import mongoose from "mongoose";

export const validateItemWithCategory = async (
  itemId: string,
  categoryId: string,
  res: any
) => {
  // validate item
  const [item, category] = await Promise.all([
    validateItem(itemId, res),
    validateCategory(categoryId, res)
  ])
  // validate Category
  const record = await itemModel.findOne({
    category: new mongoose.Types.ObjectId(categoryId?.toString()),
    _id: new mongoose.Types.ObjectId(itemId?.toString()),
  });
  if (!record) {
    return sendError(
      res,
      500,
      // `The item ${item.itemName} selected doesn't belong to the category ${category.categoryName}`
      `The item   selected doesn't belong to the category  `

    );
  }
};
export const validateItemWithSeller = async (
  itemId: string,
  sellerId: string,
  res: any
) => {
  // const [seller, item] :[seller:any,item:mongoose.HydratedDocument<itemDetailSchemaType>|null]=  await Promise.all([
  //   validateSeller(sellerId, res),
  //   validateItem(itemId, res)
  // ])
  const item =    await validateItem(itemId, res)
  const seller = await    validateSeller(sellerId, res)


  const record= await itemModel.findOne({
    sellerId: new mongoose.Types.ObjectId(sellerId?.toString()),
    _id: new mongoose.Types.ObjectId(itemId?.toString()),
  });
  if (!record) {
    return sendError(
      res,
      500,
      `The selected item ${item?.itemName}  doesn't belong to the seller `

    );
  }
};
export const validateItem = async (itemId: string, res: Response) => {
  const record :mongoose.HydratedDocument<itemDetailSchemaType>|null= await itemModel.findOne({
    _id: new mongoose.Types.ObjectId(itemId?.toString()),
  })
  console.log('record',record?.itemName)
  if (!record) {
    return sendError(res, 500, "The item selected doesn't exist");
  }
  return record
}
export const validateCategory = async (categoryId: string, res: Response) => {
  const record = await categoryModel.findOne({
    _id: new mongoose.Types.ObjectId(categoryId?.toString()),
  });
  if (!record) {
    return sendError(res, 500, "The selected category  doesn't exist");
  }
  return record;
}
export const validateSeller = async (sellerId: string, res: Response) => {
  const record  = await userModel.findOne({
    _id: new mongoose.Types.ObjectId(sellerId?.toString()),
    isSeller: true
  });
  console.log('seller record',record)
  if (!record) {
    return sendError(res, 500, "The seller selected doesn't exist");
  }
  return record
}
export const updateItemDetails: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const headers: any = req.headers
  const {
    itemid,
    categoryid,
    sellerid,
  }: { itemid: string; categoryid: string; sellerid: string } = headers;

  await Promise.all([
    validateItemWithCategory(itemid, categoryid, res),
    validateItemWithSeller(itemid, sellerid, res),
  ]);
  const result = await itemModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(itemid?.toString()) },
    { ...req.body, category: categoryid, sellerId: sellerid }
  );

  return UPDATE(res, result, "Item");
};
export const deleteItemDetails: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const headers: any = req.headers
  const {
    itemid,
    sellerid,
  }: { itemid: string; sellerid: string } = headers;

  await validateItemWithSeller(itemid, sellerid, res)
  // @TODO: Images to be deleted related to the item
  const result = await itemModel.deleteOne({ _id: new mongoose.Types.ObjectId(itemid?.toString()) })

  return DELETE(res, result, "Item");
}

export const addItemDetails: RequestHandler = async (req: Request, res: Response) => {
  const sellerId = req.headers.sellerid
  const record = await userModel.findOne({ userId: sellerId, isSeller: true });
  if (!record) {
    return sendError(res, 406, "You are not a seller")
  }

  let newItem = new itemModel({ ...req.body, sellerId: req.headers.sellerid, category: req.headers.categoryid })
  const result = await newItem.save();
  return CREATE(res, result, "Item");
};
interface getItemsQuery {
  page:number,
  limit: number,
  sort:string,
  order:number,
  filters:any
}
export const getItems: RequestHandler = async (req: Request, res: Response) => {
  const { page=1,limit=30,sort='itemName',order=1,...filters}=req.query as unknown as  getItemsQuery 
  
  const data = await itemModel.paginate({...filters},{
    sort:{[sort]:order},
    limit :limit,
    offset:limit*(page-1),
    page:page
  })
  return GET(res, {}, "Items");
}

