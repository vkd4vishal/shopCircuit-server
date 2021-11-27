import Joi from 'joi'

export const itemImageValidator = Joi.object({
    userid: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/) ,
    itemid: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)

}); 
