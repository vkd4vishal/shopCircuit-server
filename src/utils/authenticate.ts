import { Request, Response, RequestHandler, NextFunction } from "express";

import jwt from "jsonwebtoken"
import { sendError } from "./index";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const excludedUrls=new Map([['/login','PUT'],['/signup','POST']])
    if((excludedUrls.has(req.url) && excludedUrls.get(req.url)===req.method) || req.method==='GET'){
        return next()
    }
    const token = req.header("token");
    if (!token) {
        return sendError(res, 401, "Auth Error")

    }

   
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET ?? "");
        if (decoded.user.id !== req.headers.userid) {
            return sendError(res, 500, "Unauthorized User.")
        }
        next();
    } catch (e) {
        return sendError(res, 500, "Invalid token")
    }
};