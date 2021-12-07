import { model, Schema, Types } from "mongoose";
const mongoose = require("mongoose");

export interface cartSchemaType extends Document {
    userId: Types.ObjectId;
    products: [{
        _id: Types.ObjectId,
        quantity: Number
    }],
}
const CartSchema = new Schema<cartSchemaType>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        products: [
            {
                _id: mongoose.Schema.Types.ObjectId,
                quantity: Number
            }
        ]
    },
);


export const cartModel = model<cartSchemaType>('Cart', CartSchema);