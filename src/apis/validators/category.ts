import Joi from 'joi'
export const categoryValidator = Joi.object({
    categoryName: Joi.string().min(1).max(50).required(),
});