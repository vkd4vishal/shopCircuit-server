import Joi from '@hapi/joi'
const userSchema = Joi.object({
    userName: Joi.string().min(1).max(20).required(),
    password: Joi.string().min(1).max(30).required(),
    firstName: Joi.string().min(1).max(20).required(),
    lastName:  Joi.string().min(1).max(20).required(),
    address:Joi.string().min(1).max(100).required(),
    isSeller:Joi.Boolean(),
    aadharNumber:Joi.number().custom((value:number, helper:any) => {
        if (value.toString().length !==12) {
            return helper.message("Aadhar number must be 12 characters long")

        } else {
            return true
        }

    }),
    // photo:
});