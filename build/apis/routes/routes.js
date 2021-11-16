"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const controllers_1 = require("../controllers");
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const index_1 = require("../../index");
exports.router = express_1.default.Router();
const validators_1 = require("../validators");
let gfs;
index_1.db.once('open', () => {
    // Init stream
    gfs = Grid(index_1.db.db, mongoose_1.default.mongo);
    gfs.collection('images');
});
exports.router.post('/signup', validators_1.upload.single('userImage'), controllers_1.signUp);
