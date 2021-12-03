import Joi from 'joi'
export const sendOtpToMailValidator = Joi.object({
    userName: Joi.string().min(1).max(20),
    email: Joi.string().email({ tlds: { allow: false } })

}).xor('userName', 'email'); 

export const validateOtpValidator = Joi.object({
    userName: Joi.string().min(1).max(20),
    email: Joi.string().email({ tlds: { allow: false } }),
    otp: Joi.number().min(1000).max(9999).required()

}).xor('userName', 'email'); 