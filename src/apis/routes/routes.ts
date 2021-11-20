import express from 'express';
import { validateBody, validateHeaders } from '../../utils';
import { addCategory, addItemDetails, deleteItemDetails, deleteUser, getCategories, getItems, getProfile, login, signUp, updateItemDetails, updateUserImage, updateUserProfile, validateFile, validateUser } from '../controllers';
import { addItemHeaderValidator, categoryValidator, deleteItemHeaderValidator, itemDetailsValidator, updateItemDetailsValidator, updateItemHeaderValidator, updateUserProfileValidator, upload, userImageReqValidator, userLoginValidator, userProfileValidator } from '../validators';

export const router = express.Router();

/*** User Profile and Image ***/
router.post('/signup', validateBody(userProfileValidator), signUp);
router.post('/updateUserImage',
    validateHeaders(userImageReqValidator), validateUser, upload.single('photo'), validateFile, updateUserImage);
router.get('/getProfile', validateHeaders(userImageReqValidator), validateUser, getProfile)
router.delete('/deleteUser', validateHeaders(userImageReqValidator), validateUser, deleteUser)

router.put('/updateUserProfile', validateHeaders(userImageReqValidator), validateBody(updateUserProfileValidator), validateUser, updateUserProfile);
router.put('/login', validateBody(userLoginValidator), login);


/** Item Details and Image */
router.post('/addItemDetails', validateHeaders(addItemHeaderValidator), validateBody(itemDetailsValidator), addItemDetails)
router.put('/updateItemDetails', validateHeaders(updateItemHeaderValidator),
    validateBody(updateItemDetailsValidator), updateItemDetails);
router.delete('/deleteItemDetails', validateHeaders(deleteItemHeaderValidator),
    deleteItemDetails);
router.get('/getItems', getItems)
/*** Categories */
router.post('/addCategory', validateBody(categoryValidator), addCategory)
router.get('/getCategories', getCategories)

//router.put('/logout', validateHeaders(userImageReqSchema), logout);




