import express from 'express'
import {signUp} from '../controllers'
export const router  = express.Router();
import multer from 'multer';

const upload=multer({dest:'uploads/'})

router.post('/signup',upload.single('profileImage'),signUp );

