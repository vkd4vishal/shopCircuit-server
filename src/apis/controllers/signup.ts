import { Request, Response, RequestHandler } from 'express'

import { userModel } from '../../Models/index'
import bcrypt from 'bcrypt'
export const signUp: RequestHandler = async (req: Request, res: Response) => {
    const { userName, password, firstName, lastName, address, isSeller, aadharNumber } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(l);
    
    let newUser = new userModel({ ...req.body, password: hashedPassword });
    // // Save the new model instance, passing a callback
    const result = await newUser.save()
    res.status(200).send(result) 
}
