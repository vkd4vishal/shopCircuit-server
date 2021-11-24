import dotenv from 'dotenv'
import { connectString } from '../config/index'
dotenv.config();
import mongoose from 'mongoose'


export const connectDB = () => {
    mongoose.connect(connectString).then(() => console.log("Connected to the Database...")).catch(err => console.log(err));
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    mongoose.set('debug', true);
    return db
}
