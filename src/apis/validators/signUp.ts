import joi from '@hapi/joi'
const pattern = "/(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}/";
const userSchema = joi.object({
    userName: joi.string().min(1).max(20).required(),
    email:joi.string().email({ tlds: { allow: false } }).required(),
    password: joi.string().min(1).max(30).regex(RegExp(pattern)).required(),
    confirmPassword: joi.ref('password'),
    firstName: joi.string().min(1).max(20).required(),
    lastName: joi.string().min(1).max(20).required(),
    address: joi.string().min(1).max(100).required(),
    isSeller: joi.boolean(),
    aadharNumber: joi.number().custom((value: number, helper: any) => {
        if (value.toString().length !== 12) {
            return helper.message("Aadhar number must be 12 characters long")

        } else {
            return true
        }

    }),
    photo:
        joi.string().required(),


});