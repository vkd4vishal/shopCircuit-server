import { Request, Response, RequestHandler,NextFunction } from 'express'
import Joi from "joi";
import { sendError } from './utils';

const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

export const validateBody = (schema:any) =>  (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    
    const { error, value } = schema.validate(req.body, options);
    
    if (error) {
      return sendError(
        res,
        442,
        `Validation error: ${error.details[0].message}.`
      )
    }
   next();
}
export const validateHeaders = (schema:any) =>  (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    const { error, value } = schema.validate(req.headers, options);
    
    if (error) {
      return sendError(
        res,
        442,
        `Validation error: ${error.details[0].message}.`
      )
    }
   next();
}
