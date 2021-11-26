import { GridFsStorage } from 'multer-gridfs-storage'
import { connectString } from './index'
import multer from 'multer'

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (!file) {
        req.file_error = "Please select an image.";
        cb(null, false)

    }
    else if (file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        req.file_error = "Only png are allowed";
        cb(null, false)

    }
}

// Create storage engine
const storage = new GridFsStorage({
    url: connectString,
    file: (req: any, file: any) => {
        return new Promise((resolve, reject) => {
            const filename = req.headers.userid + '.png';
            const fileInfo = {
                filename: filename,
                bucketName: 'itemImages'
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
