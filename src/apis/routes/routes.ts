import express from "express";
import {
  handleError,
  validateBody,
  validateCustomer,
  validateHeaders,
  validateImage,
  validateItem,
  validateItemWithSeller,
  validateMultipleImages,
  validateSeller,
  validateUser,
} from "../../utils";
import {
  addCategory,
  addItemDetails,
  changePassword,
  deleteItemImages,
  deleteItems,
  deleteRatingAndReviews,
  deleteUser,
  forgotPassword,
  getCategories,
  getItemDetails,
  getItemImage,
  getItems,
  getProfile,
  getRatingAndReviews,
  login,
  saveRatingAndReviews,
  sendOtpToMail,
  signUp,
  updateItemDetails,
  updateUserImage,
  updateUserProfile,
  uploadItemImages,
  validateEmailOtp,
} from "../controllers";
import {
  addToCart,
  deleteFromCart,
  getCartItems,
  updateCartItem,
} from "../controllers/cart";
import {
  addItemHeaderValidator,
  categoryValidator,
  changePasswordValidator,
  deleteItemImagesBodyValidator,
  deleteItemImagesHeaderValidator,
  deleteItemsBodyValidator,
  forgotPasswordValidator,
  itemDetailsValidator,
  itemImageValidator,
  quantityValidator,
  ratingAndReviewBodyValidator,
  ratingAndReviewHeaderValidator,
  sendOtpToMailValidator,
  updateItemDetailsValidator,
  updateItemHeaderValidator,
  updateUserProfileValidator,
  uploadItemImage,
  uploadUserImage,
  userLoginValidator,
  userProfileValidator,
  validateEmailOtpValidator,
} from "../validators";

export const router = express.Router();
//router.put('/logout', validateHeaders(userImageReqSchema), logout);
/****************************************** User Profile and Image ******************************************/
router.post("/signup", validateBody(userProfileValidator), handleError(signUp));
router.post(
  "/updateUserImage",
  validateUser,
  uploadUserImage.single("photo"),
  validateImage,
  handleError(updateUserImage)
);
router.get("/getProfile", validateUser, handleError(getProfile));
router.delete("/deleteUser", validateUser, handleError(deleteUser));

router.put(
  "/updateUserProfile",
  validateBody(updateUserProfileValidator),
  validateUser,
  handleError(updateUserProfile)
);
router.post("/login", validateBody(userLoginValidator), handleError(login));

/***************************************** Item Details and Image ****************************************/
router.post(
  "/addItemDetails",
  validateHeaders(addItemHeaderValidator),
  validateBody(itemDetailsValidator),
  handleError(addItemDetails)
);
router.put(
  "/updateItemDetails",
  validateHeaders(updateItemHeaderValidator),
  validateBody(updateItemDetailsValidator),
  handleError(updateItemDetails)
);
router.post(
  "/deleteItems",
  validateBody(deleteItemsBodyValidator),
  handleError(deleteItems)
);
router.post(
  "/deleteItemImages",
  validateHeaders(deleteItemImagesHeaderValidator),
  validateBody(deleteItemImagesBodyValidator),
  handleError(deleteItemImages)
);
router.get("/getItems", handleError(getItems));
router.get("/getItemDetails", handleError(getItemDetails));
router.get("/getItemImage", handleError(getItemImage));
router.post(
  "/uploadItemImages",
  validateHeaders(itemImageValidator),
  validateSeller,
  validateItemWithSeller,
  uploadItemImage.array("itemImage"),
  validateMultipleImages,
  handleError(uploadItemImages)
);

/********************************************** Categories ***************************************/
router.post(
  "/addCategory",
  validateBody(categoryValidator),
  handleError(addCategory)
);
router.get("/getCategories", handleError(getCategories));

/************************************************ Cart Management ***********************************************/
router.post(
  "/addToCart",
  validateHeaders(itemImageValidator),
  validateCustomer,
  validateItem,
  handleError(addToCart)
);
router.delete(
  "/deleteFromCart",
  validateHeaders(itemImageValidator),
  validateCustomer,
  validateItem,
  handleError(deleteFromCart)
);
router.put(
  "/updateCartItem",
  validateBody(quantityValidator),
  validateHeaders(itemImageValidator),
  validateCustomer,
  validateItem,
  handleError(updateCartItem)
);
router.get(
  "/getCartItems",
  validateHeaders(itemImageValidator),
  validateCustomer,
  validateItem,
  handleError(getCartItems)
);
/*************************************** Forgot Password ***************************************/
router.post(
  "/sendOtpToMail",
  validateBody(sendOtpToMailValidator),
  handleError(sendOtpToMail)
);
router.post(
  "/validateEmailOtp",
  validateBody(validateEmailOtpValidator),
  handleError(validateEmailOtp)
);
router.put(
  "/forgotPassword",
  validateBody(forgotPasswordValidator),
  handleError(forgotPassword)
);
router.put(
  "/changePassword",
  validateBody(changePasswordValidator),
  handleError(changePassword)
);
/*************************************** Ratings and Reviews ***************************************/
router.get("/getRatingAndReviews", handleError(getRatingAndReviews));

router.post(
  "/saveRatingAndReviews",
  validateHeaders(ratingAndReviewHeaderValidator),
  validateBody(ratingAndReviewBodyValidator),
  handleError(saveRatingAndReviews)
);
router.delete(
  "/deleteRatingAndReviews",
  validateHeaders(ratingAndReviewHeaderValidator),
  handleError(deleteRatingAndReviews)
);
