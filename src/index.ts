// import chalk = require('chalk')

// import {userModel} from './Models/User'
// import {connectString} from './config/config'

import express from "express"

import connectDB from "./config/db"
// const connectDB = require('./config/db')


//Import the mongoose module
// const mongoose = require('mongoose');
connectDB()
const app = express()
const port = process.env.PORT;



// let newUser = new userModel({ username: 1, password: '123456',firstName:'name',lastName:'lastName',address:'Address',isSeller:true,aadharNumber:12});
// // Save the new model instance, passing a callback
// newUser.save(function (err) {
//   if (err) return console.log(chalk.bgRed.bold(err));
//   console.log(chalk.bgGreen.bold("Saved"));
//   // saved!
// });
app.listen(port, () => {
  console.log(`Started up at port ${port}`); 
});