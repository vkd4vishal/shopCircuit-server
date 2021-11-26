import { Response, RequestHandler, NextFunction, Request } from 'express'
export class AppError {
    
    errorCode: number
    message: string

    constructor(errorCode: number, message: string) {
        
        this.errorCode = errorCode
        this.message = message
    }
}
export const sendError = ( statusCode: number, error: any) => {
    throw new AppError(statusCode, error)

}
export const CREATE = (res: Response, data: any, id: string) => {
    res.status(201).send({ data, message: `${id} created successfully.` })
}
export const UPDATE = (res: Response, data: any, id: string) => {
    res.status(200).send({ data, message: `${id} saved successfully.` })
}
export const DELETE = (res: Response, data: any, id: string) => {
    res.status(200).send({ data, message: `${id} deleted successfully.` })
}
export const GET = (res: Response, data: any, id: string) => {
    res.status(200).send({ data, message: `${id} fetched successfully.` })
}


export const handleError = (fun: RequestHandler) =>async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    await Promise.resolve(fun(req,res,next)).catch((err: any) => res.status(500).send(JSON.stringify(err)))
    
  }
