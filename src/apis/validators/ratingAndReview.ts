import Joi from 'joi'
export const ratingAndReviewHeaderValidator = Joi.object({
    sellerId: Joi.string().regex(/^[0-9a-fA-F]{24}$/), 
    itemId:Joi.string().regex(/^[0-9a-fA-F]{24}$/), 
    userid:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})
export const ratingAndReviewBodyValidator = Joi.object({
    review: Joi.string().max(200),
    rating: Joi.number().min(1).max(5).required()
})