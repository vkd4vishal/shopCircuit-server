
import  mongoose from "mongoose"
let schema = mongoose.Schema;

var itemSchema = new schema({
    itemName: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: [true, 'You must enter item name.'],
    },
    price: {
        type: Number,
        default: 0,
        required: true,
        min:0
    },
    category: {
        type:mongoose.Schema.Types.ObjectId,
        required: [true, 'Category required.'],
    },
    weight: {
    type: Number,
    default: 0,
    required: true,
    min:0
    },
    sellerId: {
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'Shop Id required.']
    },
    brand: {
        type: String,
        minLength: 1,
        maxLength: 20,
        required: [true, 'You must enter brand.'],
    },
});

// Compile model from schema
export const itemModel = mongoose.model('Items', itemSchema);

