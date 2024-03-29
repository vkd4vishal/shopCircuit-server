

import express from "express";
import mongoose from 'mongoose';
import { router } from '../src/apis/routes/routes';
import { connectDB } from "./database/index";
import { auth } from './utils';
export const db = connectDB()

export let userImageGfs: any,itemImageGfs:any;
db.once('open', () => {
  userImageGfs = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: 'userProfileImages'
  })
  itemImageGfs = new mongoose.mongo.GridFSBucket(db.db, {
    bucketName: 'itemImages'
  })
});
const app = express()
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(auth)
app.use(router)

const port = process.env.PORT;




app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});