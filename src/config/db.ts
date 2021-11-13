import dotenv from 'dotenv'
import { connectString } from './config'
dotenv.config();
// import {userModel} from '../Models/User'
// //Import the mongoose module
import mongoose from 'mongoose'


function connectDB() {
    // console.log(config.connectString)
    mongoose.connect(connectString).then(() => console.log("Connected to the Database...")).catch(err => console.log(err));
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
export default connectDB