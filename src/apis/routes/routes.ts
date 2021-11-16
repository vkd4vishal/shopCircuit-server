import express from 'express'
import { signUp } from '../controllers'
export const router = express.Router();
import { upload, userSchema } from '../validators'
import { gfs } from '../../index'
router.post('/signup', upload.single('userImage'), signUp);
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


