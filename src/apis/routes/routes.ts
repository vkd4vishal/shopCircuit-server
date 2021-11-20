import express from 'express'
import { signUp, updateUserImage, validateUser, validateFile, getProfile, deleteUser, updateUserProfile, login } from '../controllers'
import { upload, userProfileSchema, userImageReqSchema, updateUserProfileSchema, userLoginSchema } from '../validators'
import { validateBody, validateHeaders, auth } from '../../utils';

export const router = express.Router();

/*** User Profile and Image ***/
router.post('/signup', validateBody(userProfileSchema), signUp);
router.post('/updateUserImage',
    validateHeaders(userImageReqSchema), validateUser, upload.single('photo'), validateFile, updateUserImage);
router.get('/getProfile',  validateHeaders(userImageReqSchema), validateUser, getProfile)
router.delete('/deleteUser', validateHeaders(userImageReqSchema), validateUser, deleteUser)

router.put('/updateUserProfile', validateHeaders(userImageReqSchema), validateBody(updateUserProfileSchema), validateUser, updateUserProfile);
router.put('/login', validateBody(userLoginSchema), login);




