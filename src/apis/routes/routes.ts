import express from 'express'
import { signUp, updateUserImage, uploadUserImage, validateFile } from '../controllers'
import { upload, userProfileSchema, userImageReqSchema } from '../validators'
import { validateBody, validateHeaders } from '../../utils/reqValidator';

export const router = express.Router();
router.post('/signup', validateBody(userProfileSchema), signUp);
router.post('/uploadUserImage', validateHeaders(userImageReqSchema), uploadUserImage, upload.single('photo'), validateFile);

router.post('/updateUserImage', validateHeaders(userImageReqSchema), updateUserImage, upload.single('photo'), validateFile);




