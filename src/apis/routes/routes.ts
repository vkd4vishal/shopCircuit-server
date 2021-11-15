import express from 'express'
import {Request} from 'express'
import {signUp} from '../controllers'
export const router  = express.Router();
import {upload} from '../validators'
router.post('/signup',upload.single('userImage'),signUp );

