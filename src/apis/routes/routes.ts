import express from 'express';
import { validateBody, validateHeaders,handleError,validateUser,validateFile } from '../../utils';
import { addCategory, addItemDetails, deleteItemDetails, deleteUser, getCategories, getItems, getProfile, login, signUp, updateItemDetails, updateUserImage, updateUserProfile } from '../controllers';
import { addItemHeaderValidator, categoryValidator, deleteItemHeaderValidator, itemDetailsValidator, updateItemDetailsValidator, updateItemHeaderValidator, updateUserProfileValidator, upload, userImageReqValidator, userLoginValidator, userProfileValidator } from '../validators';

export const router = express.Router();

/*** User Profile and Image ***/
router.post('/signup', validateBody(userProfileValidator), handleError(signUp));
router.post('/updateUserImage',  
    validateHeaders(userImageReqValidator), validateUser, upload.single('photo'), validateFile, handleError(updateUserImage));
router.get('/getProfile', validateHeaders(userImageReqValidator), validateUser, handleError(getProfile))
router.delete('/deleteUser', validateHeaders(userImageReqValidator), validateUser, handleError(deleteUser))

router.put('/updateUserProfile', validateHeaders(userImageReqValidator), validateBody(updateUserProfileValidator), validateUser, handleError(updateUserProfile));
router.put('/login', validateBody(userLoginValidator), handleError(login)); 


/** Item Details and Image */
router.post('/addItemDetails', validateHeaders(addItemHeaderValidator), validateBody(itemDetailsValidator), handleError(addItemDetails))
router.put('/updateItemDetails', validateHeaders(updateItemHeaderValidator),
    validateBody(updateItemDetailsValidator), 
    handleError(updateItemDetails));
router.delete('/deleteItemDetails', validateHeaders(deleteItemHeaderValidator),
handleError(deleteItemDetails));
router.get('/getItems', handleError(getItems))
/*** Categories */
router.post('/addCategory', validateBody(categoryValidator), handleError(addCategory))
router.get('/getCategories', handleError(getCategories)) 

//router.put('/logout', validateHeaders(userImageReqSchema), logout);




