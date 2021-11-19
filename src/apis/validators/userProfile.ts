import Joi from 'joi'
const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const userProfileSchema = Joi.object({
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
export const updateUserProfileSchema = Joi.object({
    userName: Joi.string().min(1).max(20),
    email:Joi.string().email(),
    firstName: Joi.string().min(1).max(20),
    lastName: Joi.string().min(1).max(20),
    address: Joi.string().min(1).max(100)
});




export const userLoginSchema = Joi.object({
    userName: Joi.string().min(1).max(20),
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().min(1).max(30).regex(pattern).required(),

}).xor('userName', 'email'); 