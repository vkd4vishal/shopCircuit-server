"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const pattern = "/(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}/";
exports.userSchema = joi_1.default.object({
    userName: joi_1.default.string().min(1).max(20).required(),
    email: joi_1.default.string().email({ tlds: { allow: false } }).required(),
    password: joi_1.default.string().min(1).max(30).regex(RegExp(pattern)).required(),
    confirmPassword: joi_1.default.ref('password'),
    firstName: joi_1.default.string().min(1).max(20).required(),
    lastName: joi_1.default.string().min(1).max(20).required(),
    address: joi_1.default.string().min(1).max(100).required(),
    isSeller: joi_1.default.boolean(),
    aadharNumber: joi_1.default.number().custom((value, helper) => {
        if (value.toString().length !== 12) {
            return helper.message("Aadhar number must be 12 characters long");
        }
        else {
            return true;
        }
    }),
    photo: joi_1.default.string().required(),
});
