import express from 'express'
import { signUp, uploadUserImage } from '../controllers'
import { upload, userProfileSchema, userImageReqSchema } from '../validators'
import { validateBody, validateQuery } from '../../utils/reqValidator';

export const router = express.Router();
router.post('/signup', validateBody(userProfileSchema), signUp);
router.post('/uploadUserImage',
    // validateFile(userImageFileSchema),
    validateQuery(userImageReqSchema), upload.single('photo'), uploadUserImage);




