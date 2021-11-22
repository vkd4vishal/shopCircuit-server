import Joi from 'joi'

export const userImageReqValidator = Joi.object({
    userid: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/) 

}); 