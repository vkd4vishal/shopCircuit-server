import Joi from 'joi';

export const quantityValidator = Joi.object({
    quantity: Joi.number().required().min(1)
}); 