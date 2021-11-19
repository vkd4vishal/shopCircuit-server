import Joi from 'joi'

// export const userImageFileSchema = Joi.object({
//     photo: Joi.string().required(),

// });
export const userImageReqSchema = Joi.object({
    userid: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/) //@TODO

}); 