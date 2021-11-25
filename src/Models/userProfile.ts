import { Document, model, Schema } from "mongoose";

export interface userSchemaType extends Document {
    userName: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    isSeller: boolean,
    aadharNumber: number
}
let userSchema = new Schema<userSchemaType>({
    userName: {
        type: String,
        minLength: 1,
        maxLength: 20,
        required: [true, 'You must enter username'],
        index: { unique: true }
    },
    email: {
        type: String,
        minLength: 1,
        maxLength: 20,
        required: [true, 'You must enter email.'],
        index: { unique: true }
    },
    password: {
        type: String,
        minLength: 1,
        maxLength: 128,
        required: [true, 'You must enter a password.']
    },
    firstName: {
        type: String,
        minLength: 1,
        maxLength: 20, required: [true, 'You must enter first name.'],
    },

    lastName: {
        type: String,
        minLength: 1,
        maxLength: 20, required: [true, 'You must enter last name.'],
    },


    address: {
        type: String,
        minLength: 1,
        maxLength: 50, required: [true, 'You must enter address.'],
    },
    isSeller: {
        type: Boolean,
        required: [true, 'Are you a seller?.']
    },
    aadharNumber: {
        type: Number,
        required: [true, 'Aadhar Number is required.'],
        min: 100000000000,
        max: 999999999999
    }
});
// interface userModel<T extends Document> {}

export const userModel = model<userSchemaType>('User', userSchema);
