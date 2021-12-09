import { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import { validateItems, validateSeller } from ".";
import { userModel } from "../../Models/index";
import {
  ItemRatingAndReviewsModel,
  ratingAndReviewsType,
} from "../../Models/itemRatingandReviews";
import {
  ratingAndReviewsModel,
  sellerRatingAndReviewModel,
  SellerRatingAndReviewsType,
} from "../../Models/sellerRatingandReviews";
import { CREATE, DELETE, GET, sendError } from "../../utils";
export const validateCustomer = async (userId: string) => {
  const record = await userModel.findOne({
    _id: new mongoose.Types.ObjectId(userId?.toString()),
    isSeller: false,
  });
  if (!record) {
    return sendError(500, "The customer selected doesn't exist");
  }
  return record;
};
interface getItemsQuery {
  page: number;
  limit: number;
  sort: string;
  order: number;
  search: string;
  filters: any;
  isSeller: boolean;
  itemId: string;
}
export const getRatingAndReviews: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const {
    page = 1,
    limit = 30,
    sort = "rating",
    order = 1,
    search = "",
    itemId = "",
    ...filters
  } = req.query as unknown as getItemsQuery;
  let where = {};
  if (search) {
    where = { ...where, $text: { $search: `${search}` } };
  }
  let model:
    | ratingAndReviewsModel<ratingAndReviewsType>
    | ratingAndReviewsModel<SellerRatingAndReviewsType> = ItemRatingAndReviewsModel;

  let validate: any[] = req.query.itemId ? [validateItems([itemId])] : [];
  await Promise.all(validate);
  if (req.query.isSeller === "true") {
    model = sellerRatingAndReviewModel;
  }
  const data = await model.paginate(
    { ...where, ...filters },
    {
      sort: { [sort]: order },
      limit: limit,
      offset: limit * (page - 1),
      page: page,
    }
  );
  return GET(res, { data }, "rating and Review");
};
export const saveRatingAndReviews: RequestHandler = async (
  req: Request,
  res: Response
) => {
  let where = {};
  const headers: any = req.headers;
  const userId: string = headers.userid;
  const itemId: string = headers.itemid;
  const sellerId: string = headers.sellerid;
  if(!itemId && !sellerId){
    return sendError(500, "The itemId or seller Id is required");
  }
  let validate: any[] = [validateCustomer(userId)];
  if (req.query.isSeller === "true") {
    validate.push(validateSeller(sellerId));
  } else {
    validate.push(validateItems([itemId]));
  }
  await Promise.all(validate);
  let model: any = ItemRatingAndReviewsModel;
  where = { ...where, userId: new mongoose.Types.ObjectId(userId?.toString()) };
  if (req.query.isSeller) {
    model = sellerRatingAndReviewModel;
    where = {
      ...where,
      sellerId: new mongoose.Types.ObjectId(sellerId?.toString()),
    };
  } else {
    where = {
      ...where,
      itemId: new mongoose.Types.ObjectId(itemId?.toString()),
    };
  }
  let result = await model.findOneAndUpdate(
    {
      ...where,
    },
    { rating: req.body.rating, review: req.body.review ?? "" },
    { upsert: true }
  );
  return CREATE(res, result, "rating and review");
};

export const deleteRatingAndReviews: RequestHandler = async (
  req: Request,
  res: Response
) => {
  // @TODO: Need to use userId and Review ID for deletion
  const headers: any = req.headers;
  const userId: string = headers.userid;
  const reviewId: string = headers.reviewid;
  let model: any = ItemRatingAndReviewsModel;
  if (req.query.isSeller === "true") {
    model = sellerRatingAndReviewModel;
  }
  let where = {
    userId: new mongoose.Types.ObjectId(userId?.toString()),
    _id: new mongoose.Types.ObjectId(reviewId?.toString()),
  };
  const record = await model.findOne({ ...where });
  if(!record){
    return sendError(500, "The review selected doesn't belong to the user");
  }
  const result = await model.deleteOne({
    ...where,
  });

  return DELETE(res, result, "rating and Review");
};
