
import  {Schema,model,Types,Document,PaginateModel} from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

export interface ratingAndReviewsType extends Document  {
    itemId:Types.ObjectId,
    userId:Types.ObjectId,
    review:string,
    rating:number,
}
let ratingAndReviewsSchema = new Schema<ratingAndReviewsType>({
    itemId: {
        type: Schema.Types.ObjectId,
        required: [true, 'Item Id required.']
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'User Id required.']
    },
    review: {
        type: String,
        maxLength: 200,
        required: false,
    },
    rating: {
        type: Number,
        default: 0,
        required: false,
        min: 0
    },
},
{
    timestamps: true,
  }
  );
ratingAndReviewsSchema.plugin(mongoosePaginate)
// itemSchema.index({ brand : 'text',temName : 'text' })

interface ratingAndReviewsModel<T extends Document> extends PaginateModel<T> {}
export const ItemRatingAndReviewsModel:ratingAndReviewsModel<ratingAndReviewsType>  = model<ratingAndReviewsType>('ItemRatingAndReviews', ratingAndReviewsSchema) as ratingAndReviewsModel<ratingAndReviewsType>;

