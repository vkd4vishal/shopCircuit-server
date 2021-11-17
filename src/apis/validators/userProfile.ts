import Joi from 'joi'
const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const userSchema = Joi.object({
    userName: Joi.string().min(1).max(20).required(),
    email:Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(1).max(30).regex(pattern).required(),
    confirmPassword: Joi.ref('password'),
    firstName: Joi.string().min(1).max(20).required(),
    lastName: Joi.string().min(1).max(20).required(),
    address: Joi.string().min(1).max(100).required(),
    isSeller: Joi.boolean(),
    aadharNumber: Joi.number().custom((value: number, helper: any) => {
        if (value.toString().length !== 12) {
            return helper.message("Aadhar number must be 12 characters long")

        } else {
            return true
        }

    })

});