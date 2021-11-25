
import { Document, model, PaginateModel, Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

export interface categorySchemaType extends Document {
    categoryName: string
}
var categorySchema = new Schema<categorySchemaType>({
    categoryName: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: [true, 'You must enter categoryName.'],
    },

});
categorySchema.plugin(mongoosePaginate)

interface categoryModel<T extends Document> extends PaginateModel<T> { }
export const categoryModel: categoryModel<categorySchemaType> = model<categorySchemaType>('Category', categorySchema) as categoryModel<categorySchemaType>;