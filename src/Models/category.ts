
import  mongoose from "mongoose"
let schema = mongoose.Schema;

var categorySchema = new schema({
    categoryName: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: [true, 'You must enter categoryName.'],
    },
    
});

export const categoryModel = mongoose.model('category', categorySchema);

