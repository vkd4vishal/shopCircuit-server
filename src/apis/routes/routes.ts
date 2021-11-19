import express from 'express'
import { signUp, updateUserImage, validateUser, validateFile, getProfile, deleteUser } from '../controllers'
import { upload, userProfileSchema, userImageReqSchema } from '../validators'
import { validateBody, validateHeaders } from '../../utils/reqValidator';

export const router = express.Router();

/*** User Profile and Image ***/
router.post('/signup', validateBody(userProfileSchema), signUp);
router.post('/updateUserImage',
    validateHeaders(userImageReqSchema), validateUser, upload.single('photo'), validateFile, updateUserImage);
router.get('/getProfile', validateHeaders(userImageReqSchema), validateUser, getProfile)
router.delete('/deleteUser', validateHeaders(userImageReqSchema), validateUser, deleteUser)





