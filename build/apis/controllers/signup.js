"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const index_1 = require("../../Models/index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validators_1 = require("../validators");
const utils_1 = require("../../utils");
class AppError {
    constructor(message) {
        this.message = message;
    }
}
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true, // remove unknown props
    };
    const { error, value } = validators_1.userSchema.validate(req.body, options);
    if (error) {
        console.log(error.details);
        return res
            .status(500)
            .send(`Validation error: ${error.details[0].message}`);
    }
    if (req.hasOwnProperty("file_error")) {
        return (0, utils_1.sendError)(res, 442, "Only jpeg and png format are allowed for the image.");
    }
    const { userName, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const record = yield index_1.userModel.findOne({ userName });
    if (record) {
        return (0, utils_1.sendError)(res, 500, "Username already exists.");
    }
    let newUser = new index_1.userModel(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
    const result = yield newUser.save();
    return (0, utils_1.CREATE)(res, result, "User Profile");
});
exports.signUp = signUp;
