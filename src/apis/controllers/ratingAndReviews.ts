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
    where = { ...where, review: {$regex: search, $options: 'i'}}
  }
  let model:
    | ratingAndReviewsModel<ratingAndReviewsType>
    | ratingAndReviewsModel<SellerRatingAndReviewsType> = ItemRatingAndReviewsModel;

  let validate: any[] = req.query.itemId ? [validateItems([itemId])] : [];
  await Promise.all(validate);
  if (req.query.isSeller === "true") {
    model = sellerRatingAndReviewModel;
  }
  let data: any = await model.paginate(
    { ...where, ...filters },
    {
      sort: { [sort]: order },
      limit: limit,
      offset: limit * (page - 1),
      page: page,
      lean: true,
    }
  );
  let result = data?.docs.map(async (each: any) => {
    const user = await userModel.findOne({ _id: each.userId });
    // console.log(user)
    if (!user) {
      return sendError(404, "Email does not exist.");
    }
    // console.log({each,user})
    return { ...each, user };
  });
  data = await Promise.all(result);
  // console.log(data.toObject())
  return GET(
    res,
    {
      data: {
        data,
        totalDocs: data.totalDocs,
        totalPages: data.totalPages,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
      },
    },
    "rating and Review"
  );
};
interface saveRatingAndReviewQuery {
  isSeller: boolean;
}
export const saveRatingAndReviews: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { isSeller } = req.query as unknown as saveRatingAndReviewQuery;
  let where = {};
  const headers: any = req.headers;
  const userId: string = "headers.userid";
  const itemId: string = headers.itemid;
  const sellerId: string = headers.userid;
  if(!itemId && !sellerId){
    return sendError(500, "The itemId or seller Id is required");
  }
  let validate: any[] = [validateCustomer(userId)];
  if (isSeller === true) {
    validate.push(validateSeller(sellerId));
  } else {
    validate.push(validateItems([itemId]));
  }
  await Promise.all(validate);
  let model: any = ItemRatingAndReviewsModel;
  where = { ...where, userId: new mongoose.Types.ObjectId(userId?.toString()) };
  console.log(isSeller);
  if (isSeller === true) {
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
  if (!record) {
    return sendError(500, "The review selected doesn't belong to the user");
  }
  const result = await model.deleteOne({
    ...where,
  });

  return DELETE(res, result, "rating and Review");
};
