"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("../config/index");
dotenv_1.default.config();
// import {userModel} from '../Models/User'
// //Import the mongoose module
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => {
    // console.log(config.connectString)
    mongoose_1.default.connect(index_1.connectString).then(() => console.log("Connected to the Database...")).catch(err => console.log(err));
    const db = mongoose_1.default.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};
exports.connectDB = connectDB;
