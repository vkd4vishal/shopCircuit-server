import Joi from 'joi'
export const itemDetailsValidator = Joi.object({
    itemName: Joi.string().min(1).max(50).required(),
    price:Joi.number().min(0).required(),
    category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() ,
    weight: Joi.number().min(0).required(),
    shopId:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).required(),
    brand:Joi.string().min(1).max(20).required(),
});