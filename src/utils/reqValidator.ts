import { NextFunction, Request, Response } from 'express';

const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};
const sendValidationError = (res: Response, error: any)=>{
  return res.status(442).send(`Validation error: ${error}.`)
}
export const validateBody = (schema: any) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  const { error } = schema.validate(req.body, options);

  if (error) {
    return sendValidationError(
      res,
      error.details[0].message
    )
  }
  next();
}
export const validateHeaders = (schema: any) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = schema.validate(req.headers, options);

  if (error) {
    return sendValidationError(
      res,
      error.details[0].message
    )
  }
  next();
}
