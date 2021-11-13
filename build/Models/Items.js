"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let schema = mongoose_1.default.Schema;
var itemSchema = new schema({
    itemName: {
        type: String,
        minLength: 1,
        maxLength: 20,
        required: [true, 'You must enter item name.'],
    },
    price: {
        type: Number,
        default: 0,
        required: true,
        min: 0
    },
    category: {
        type: String,
        minLength: 1,
        maxLength: 20,
        required: [true, 'Category required.'],
    },
    image: {
        type: String,
        required: [true]
    },
    weight: {
        type: Number,
        default: 0,
        required: true,
        min: 0
    }
});
// Compile model from schema
exports.itemModel = mongoose_1.default.model('Items', itemSchema);
