import express from "express";
import {
  handleError, validateBody,
  validateHeaders, validateImage,
  validateItem,
  validateMultipleImages,
  validateSeller, validateUser
} from "../../utils";
import {
  addCategory,
  addItemDetails,
  deleteItem, deleteUser,
  getCategories, getItemDetails, getItems,
  getProfile,
  login,
  signUp,
  updateItemDetails,
  updateUserImage,
  updateUserProfile,
  uploadItemImages
} from "../controllers";
import {
  addItemHeaderValidator,
  categoryValidator,
  deleteItemHeaderValidator,
  itemDetailsValidator,
  itemImageValidator, updateItemDetailsValidator,
  updateItemHeaderValidator,
  updateUserProfileValidator, uploadItemImage,
  uploadUserImage, userImageReqValidator,
  userLoginValidator,
  userProfileValidator
} from "../validators";

export const router = express.Router();
//router.put('/logout', validateHeaders(userImageReqSchema), logout);
/*** User Profile and Image ***/
router.post("/signup", validateBody(userProfileValidator), handleError(signUp));
router.post(
  "/updateUserImage",
  validateHeaders(userImageReqValidator),
  validateUser,
  uploadUserImage.single("photo"),
  validateImage,
  handleError(updateUserImage)
);
router.get(
  "/getProfile",
  validateHeaders(userImageReqValidator),
  validateUser,
  handleError(getProfile)
);
router.delete(
  "/deleteUser",
  validateHeaders(userImageReqValidator),
  validateUser,
  handleError(deleteUser)
);

router.put(
  "/updateUserProfile",
  validateHeaders(userImageReqValidator),
  validateBody(updateUserProfileValidator),
  validateUser,
  handleError(updateUserProfile)
);
router.post("/login", validateBody(userLoginValidator), handleError(login));

/** Item Details and Image */
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
router.delete(
  "/deleteItem",
  validateHeaders(deleteItemHeaderValidator),
  handleError(deleteItem)
);
router.get("/getItems", handleError(getItems));
router.get("/getItemDetails", handleError(getItemDetails));
/*** Categories */
router.post(
  "/addCategory",
  validateBody(categoryValidator),
  handleError(addCategory)
);
router.get("/getCategories", handleError(getCategories));
router.post(
  "/uploadItemImages",
  validateHeaders(itemImageValidator),
  validateSeller,
  validateItem,
  uploadItemImage.array("itemImage"),
  validateMultipleImages,
  handleError(uploadItemImages)
);
