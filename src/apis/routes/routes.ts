import express from 'express'
import { signUp, updateUserImage, validateUser, validateFile, getProfile, deleteUser, updateUserProfile, login } from '../controllers'
import { upload, userProfileValidator, userImageReqValidator, updateUserProfileValidator, userLoginValidator,updateItemDetailsValidator, deleteItemHeaderValidator, updateItemHeaderValidator } from '../validators'
import { validateBody, validateHeaders, auth } from '../../utils';
import { deleteItemDetails, updateItemDetails } from '../controllers/item';

export const router = express.Router();

/*** User Profile and Image ***/
router.post('/signup', validateBody(userProfileValidator), signUp);
router.post('/updateUserImage',
    validateHeaders(userImageReqValidator), validateUser, upload.single('photo'), validateFile, updateUserImage);
router.get('/getProfile',  validateHeaders(userImageReqValidator), validateUser, getProfile)
router.delete('/deleteUser', validateHeaders(userImageReqValidator), validateUser, deleteUser)

router.put('/updateUserProfile', validateHeaders(userImageReqValidator), validateBody(updateUserProfileValidator), validateUser, updateUserProfile);
router.put('/login', validateBody(userLoginValidator), login);
router.put('/updateItemDetails',validateHeaders(updateItemHeaderValidator),
validateBody(updateItemDetailsValidator), updateItemDetails);
router.delete('/deleteItemDetails',validateHeaders(deleteItemHeaderValidator),
 deleteItemDetails);




