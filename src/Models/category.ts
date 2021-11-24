
import  mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

let schema = mongoose.Schema;

var categorySchema = new schema({
    categoryName: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: [true, 'You must enter categoryName.'],
    },
    
});
categorySchema.plugin(mongoosePaginate)

export const categoryModel = mongoose.model('category', categorySchema);

