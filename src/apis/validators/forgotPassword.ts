import Joi from 'joi'
const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const sendOtpToMailValidator = Joi.object({
    userName: Joi.string().min(1).max(20),
    email: Joi.string().email({ tlds: { allow: false } })

}).xor('userName', 'email'); 

export const validateEmailOtpValidator = Joi.object({
    userName: Joi.string().min(1).max(20),
    email: Joi.string().email({ tlds: { allow: false } }),
    otp: Joi.number().min(1000).max(9999).required()

}).xor('userName', 'email'); 
export const forgotPasswordValidator = Joi.object({
    password: Joi.string().min(1).max(30).regex(pattern).required()

})
export const changePasswordValidator = Joi.object({
    oldPassword: Joi.string().min(1).max(30).regex(pattern).required(),
    newPassword: Joi.string().min(1).max(30).regex(pattern).required()

})