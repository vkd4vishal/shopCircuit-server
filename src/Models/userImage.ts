
import mongoose from "mongoose"
let schema = mongoose.Schema;


const userProfileImages = new schema({
    _id: {
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    photo:
    {
        contentType: String,
        required: [false, 'Please upload your image.']
    }
});
export const userProfileImagesModel = mongoose.model('userProfileImages', userProfileImages);
