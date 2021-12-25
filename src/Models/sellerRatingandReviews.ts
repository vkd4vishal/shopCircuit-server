
import  {Schema,model,Types,Document,PaginateModel} from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

export interface SellerRatingAndReviewsType extends Document  {
    sellerId:Types.ObjectId,
    userId:Types.ObjectId,
    review:string,
    rating:number,
}
let ratingAndReviewsSchema = new Schema<SellerRatingAndReviewsType>({
    sellerId: {
        type: Schema.Types.ObjectId,
        required: [true, 'seller Id required.']
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
  });
ratingAndReviewsSchema.plugin(mongoosePaginate)
// itemSchema.index({ brand : 'text',temName : 'text' })

export interface ratingAndReviewsModel<T extends Document> extends PaginateModel<T> {}
export const sellerRatingAndReviewModel:ratingAndReviewsModel<SellerRatingAndReviewsType>  = model<SellerRatingAndReviewsType>('sellerRatingAndReviews', ratingAndReviewsSchema) as ratingAndReviewsModel<SellerRatingAndReviewsType>;

