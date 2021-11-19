

import express from "express"
import { router } from '../src/apis/routes/routes'
import { connectDB } from "./database/index"

import mongoose from 'mongoose'

// const Grid = require('gridfs-stream');
export const db = connectDB()

export let gfs:any;
db.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(db.db,{
    bucketName:'userProfileImages'
  })
});
const app = express()
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(router)


const port = process.env.PORT;




app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});