import express from 'express'
import { signUp, updateUserImage, validateUser, validateFile, getProfile, deleteUser, updateUserProfile, login,getItems } from '../controllers'
import { upload, userProfileValidator, userImageReqValidator, updateUserProfileValidator, userLoginValidator,updateItemDetailsValidator, deleteItemHeaderValidator, updateItemHeaderValidator } from '../validators'
import { validateBody, validateHeaders, auth } from '../../utils';
import { deleteItemDetails, updateItemDetails, addItemDetails ,addCategory} from '../controllers/item';
import { addItemHeaderValidator, itemDetailsValidator,categoryValidator } from '../validators';

export const router = express.Router();

/*** User Profile and Image ***/
router.post('/signup', validateBody(userProfileValidator), signUp);
router.post('/updateUserImage',
    validateHeaders(userImageReqValidator), validateUser, upload.single('photo'), validateFile, updateUserImage);
router.get('/getProfile',  validateHeaders(userImageReqValidator), validateUser, getProfile)
router.delete('/deleteUser', validateHeaders(userImageReqValidator), validateUser, deleteUser)

router.put('/updateUserProfile', validateHeaders(userImageReqValidator), validateBody(updateUserProfileValidator), validateUser, updateUserProfile);
router.put('/login', validateBody(userLoginValidator), login);


/** Item Details and Image */
router.post('/addItemDetails', validateHeaders(addItemHeaderValidator),validateBody(itemDetailsValidator),addItemDetails)
router.put('/updateItemDetails', validateHeaders(updateItemHeaderValidator),
    validateBody(updateItemDetailsValidator), updateItemDetails);
router.delete('/deleteItemDetails', validateHeaders(deleteItemHeaderValidator),
    deleteItemDetails);
router.get('/getItems',  getItems)
router.post('/addCategory',validateBody(categoryValidator),addCategory)



