const dotenv = require('dotenv');
dotenv.config();
const env = process.env
const user = env.NODE_ENV === 'test' ? env.TEST_USER : env.USER
const key = env.MONGODB_TOKEN
const db = env.NODE_ENV === 'test' ? env.TEST_ENV : env.ENV
export const connectString=`mongodb+srv://${user}:${key}@cluster0.mwy82.mongodb.net/${db}?retryWrites=true&w=majority&tls=true`
 