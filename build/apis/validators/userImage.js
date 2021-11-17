"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userImageReqSchema = exports.userImageFileSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userImageFileSchema = joi_1.default.object({
    photo: joi_1.default.string().required(),
});
exports.userImageReqSchema = joi_1.default.object({
    userName: joi_1.default.string().min(1).max(20).required()
});
