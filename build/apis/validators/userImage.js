"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
// import Grid from 'gridfs-stream';
const index_1 = require("../../config/index");
const multer_1 = __importDefault(require("multer"));
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './images')
//     },
//     filename: function (req, file, cb) {
//         cb(null, req.body.userName + `${file.mimetype === 'image/jpeg' ? '.jpeg' : '.png'}`)
//     }
// })
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        req.file_error = "Only jpeg and png are allowed";
        cb(null, false);
    }
};
// export const upload = multer({
//     storage, limits: {
//         fileSize: 1024 * 1024 * 4
//     }, fileFilter
// })
// Create storage engine
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: index_1.connectString,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = req.body.userName + `${file.mimetype === 'image/jpeg' ? '.jpeg' : '.png'}`;
            const fileInfo = {
                filename: filename,
                bucketName: 'images'
            };
            resolve(fileInfo);
        });
    }
});
exports.upload = (0, multer_1.default)({
    storage, limits: {
        fileSize: 1024 * 1024 * 4
    }, fileFilter
});
