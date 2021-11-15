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
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.hasOwnProperty('file_error')) {
        res.status(200).send('Only jpeg and png format are allowed for the image.');
        return;
    }
    const { userName, password, firstName, lastName, address, isSeller, aadharNumber } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    let newUser = new index_1.userModel(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
    // // Save the new model instance, passing a callback
    const result = yield newUser.save();
    res.status(200).send(result);
});
exports.signUp = signUp;
