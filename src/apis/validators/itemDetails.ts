import Joi from 'joi'
export const itemDetailsValidator = Joi.object({
    itemName: Joi.string().min(1).max(50).required(),
    price:Joi.number().min(0).required(),
    weight: Joi.number().min(0).required(),
    brand:Joi.string().min(1).max(50).required(),
});
export const updateItemDetailsValidator = Joi.object({
    itemName: Joi.string().min(1).max(50),
    price:Joi.number().min(0),
    weight: Joi.number().min(0),
    brand:Joi.string().min(1).max(50),
});
export const updateItemHeaderValidator = Joi.object({
    itemid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), 
    categoryid:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), 
    sellerid:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
}); 
export const deleteItemHeaderValidator = Joi.object({
    itemid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), 
    sellerid:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
}); 
export const addItemHeaderValidator = Joi.object({
    categoryid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), 
    sellerid:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
}); 