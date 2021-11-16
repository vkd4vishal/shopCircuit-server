import { GridFsStorage } from 'multer-gridfs-storage'

// import Grid from 'gridfs-stream';
import { connectString } from '../../config/index'
import multer from 'multer'
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './images')
//     },
//     filename: function (req, file, cb) {
//         cb(null, req.body.userName + `${file.mimetype === 'image/jpeg' ? '.jpeg' : '.png'}`)
//     }
// })
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        req.file_error = "Only jpeg and png are allowed";
        cb(null, false)

    }
}
// export const upload = multer({
//     storage, limits: {
//         fileSize: 1024 * 1024 * 4
//     }, fileFilter
// })

// Create storage engine
const storage = new GridFsStorage({
    url: connectString,
    file: (req: any, file: any) => {
        return new Promise((resolve, reject) => {
            const filename = req.body.userName + `${file.mimetype === 'image/jpeg' ? '.jpeg' : '.png'}`;
            const fileInfo = {
                filename: filename,
                bucketName: 'images'
            };
            resolve(fileInfo);
        });
    }
})

export const upload = multer({
    storage, limits: {
        fileSize: 1024 * 1024 * 4
    }, fileFilter
})