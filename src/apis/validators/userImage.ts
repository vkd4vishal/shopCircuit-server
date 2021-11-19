import Joi from 'joi'

export const userImageReqSchema = Joi.object({
    userid: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/) 

}); 