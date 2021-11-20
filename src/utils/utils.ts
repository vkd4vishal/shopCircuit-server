import { Response } from 'express'
export const sendError=(res: Response,statusCode:number,error:any) => {
    res.status(statusCode).send({error})
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
