// import chalk = require('chalk')

// import {userModel} from './Models/User'
// import {connectString} from './config/config'

import express from "express"
import {router} from '../src/apis/routes/routes'
import {connectDB} from "./database/index"
// const connectDB = require('./config/db')


//Import the mongoose module
// const mongoose = require('mongoose');
connectDB()
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