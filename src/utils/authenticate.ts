import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendError } from "./index";


export const auth = (req: Request, res: Response, next: NextFunction) => {
    const excludedUrls = new Map([['/login', 'PUT'], ['/signup', 'POST']])
    if ((excludedUrls.has(req.url) && excludedUrls.get(req.url) === req.method) || req.method === 'GET') {
        return next()
    }
    const token = req.header("token");
    if (!token) {
        return sendError(res, 401, "Authentication  Error")

    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET ?? "");
        if (decoded.user.id !== req.headers.userid) {
            return sendError(res, 401, "Unauthorized User.")
        }
        next();
    } catch (e: any) {
        return sendError(res, 401, e.name === 'TokenExpiredError' ? e.message : "Invalid token")
    }
};