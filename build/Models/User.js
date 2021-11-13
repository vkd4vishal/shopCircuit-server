"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//Define a schema
let schema = mongoose_1.default.Schema;
var userSchema = new schema({
    userName: {
        type: String,
        minLength: 1,
        maxLength: 20,
        required: [true, 'You must enter username'],
        index: { unique: true }
    },
    password: {
        type: String,
        minLength: 1,
        maxLength: 128,
        required: [true, 'You must enter a password.']
    },
    firstName: {
        type: String,
        minLength: 1,
        maxLength: 20, required: [true, 'You must enter first name.'],
    },
    lastName: {
        type: String,
        minLength: 1,
        maxLength: 20, required: [true, 'You must enter last name.'],
    },
    address: {
        type: String,
        minLength: 1,
        maxLength: 50, required: [true, 'You must enter address.'],
    },
    isSeller: {
        type: Boolean,
        required: [true, 'Are you a seller?.']
    },
    aadharNumber: {
        type: Number,
        required: [true, 'Aadhar Number is required.'],
        min: 100000000000,
        max: 999999999999
    },
    photo: {
        data: Buffer,
        contentType: String,
        required: [false, 'Please upload your image.']
    }
});
// Compile model from schema
exports.userModel = mongoose_1.default.model('User', userSchema);
// Create an instance of model SomeModel
// var awesome_instance = new userModel({ name: 'vkd',password:'vishal' });
