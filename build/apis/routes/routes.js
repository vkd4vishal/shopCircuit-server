"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
const reqValidator_1 = require("../../utils/reqValidator");
exports.router = express_1.default.Router();
exports.router.post('/signup', (0, reqValidator_1.validateBody)(validators_1.userProfileSchema), controllers_1.signUp);
exports.router.post('/uploadUserImage', (0, reqValidator_1.validateFile)(validators_1.userImageFileSchema), (0, reqValidator_1.validateQuery)(validators_1.userImageReqSchema), validators_1.upload.single('userImage'), controllers_1.uploadUserImage);
