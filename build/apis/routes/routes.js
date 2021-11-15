"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
exports.router = express_1.default.Router();
const validators_1 = require("../validators");
exports.router.post('/signup', validators_1.upload.single('userImage'), controllers_1.signUp);
