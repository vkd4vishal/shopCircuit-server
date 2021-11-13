import express from 'express'
import {signUp} from '../controllers'
export const router  = express.Router();

router.post('/signup',signUp );

