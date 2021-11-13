
import  mongoose from "mongoose"
let schema = mongoose.Schema;

var itemSchema = new schema({
    itemName: {
        type: String,
        minLength: 1,
        maxLength: 20,
        required: [true, 'You must enter item name.'],
    },
    price: {
        type: Number,
        default: 0,
        required: true,
        min:0
    },
    category: {
        type: String,
        minLength: 1,
        maxLength: 20,
        required: [true, 'Category required.'],
    },
    image: {
        type: String,
        required: [true]
    },

    weight: {
        type: Number,
    default: 0,
    required: true,
    min:0
    }
});

// Compile model from schema
export const itemModel = mongoose.model('Items', itemSchema);

