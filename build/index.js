"use strict";
// import chalk = require('chalk')
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import {userModel} from './Models/User'
// import {connectString} from './config/config'
const express_1 = __importDefault(require("express"));
const routes_1 = require("../src/apis/routes/routes");
const index_1 = require("./database/index");
// const connectDB = require('./config/db')
//Import the mongoose module
// const mongoose = require('mongoose');
(0, index_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(routes_1.router);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});