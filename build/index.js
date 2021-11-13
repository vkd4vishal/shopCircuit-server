"use strict";
// import chalk = require('chalk')
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import {userModel} from './Models/User'
// import {connectString} from './config/config'
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
// const connectDB = require('./config/db')
//Import the mongoose module
// const mongoose = require('mongoose');
(0, db_1.default)();
const app = (0, express_1.default)();
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
