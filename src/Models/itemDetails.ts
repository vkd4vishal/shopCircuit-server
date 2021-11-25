
import  {Schema,model,Types,Document,PaginateModel} from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'
// const=mongoose

export interface itemDetailSchemaType extends Document  {
    itemName:string,
    price:number,
    category:Types.ObjectId,
    weight:number,
    sellerId:Types.ObjectId,
    brand:string
}
let itemSchema = new Schema<itemDetailSchemaType>({
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
        min: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        required: [true, 'Category required.'],
    },
    weight: {
        type: Number,
        default: 0,
        required: true,
        min: 0
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        required: [true, 'Shop Id required.']
    },
    brand: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: [true, 'You must enter brand.'],
    },
});
itemSchema.plugin(mongoosePaginate)
interface itemModel<T extends Document> extends PaginateModel<T> {}
export const itemModel:itemModel<itemDetailSchemaType>  = model<itemDetailSchemaType>('Items', itemSchema) as itemModel<itemDetailSchemaType>;

