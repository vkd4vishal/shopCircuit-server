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
// router.get('/images', (req, res) => {
//     gfs.find().toArray((err: any, files: any) => {
//         // Check if files
//         if (!files || files.length === 0) {
//             // res.render('index', { files: false });
//             res.send('No Images found')
//             console.log(err)
//         } else {
//             const file = files[1]
//             gfs.openDownloadStreamByName(file.filename).pipe(res)
//             //         files.map((file: any) => {
//             //             if (
//             //                 file.contentType === 'image/jpeg' ||
//             //                 file.contentType === 'image/png'
//             //             ) {
//             //                 file.isImage = true;
//             //                 const readstream = gfs.createReadStream(file.filename);
//             //   readstream.pipe(res);
//             //             } else {
//             //                 file.isImage = false;
//             //             }
//             //         });
//             //         // res.render('index', { files: files });
//             //         res.send(files)
//         }
//     });
// });
