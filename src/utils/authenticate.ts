import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const auth = (req: Request, res: Response, next: NextFunction) => {
    const excludedUrls = new Map([['/login', 'POST'], ['/signup', 'POST']])
    if ((excludedUrls.has(req.url) && excludedUrls.get(req.url) === req.method) || req.method === 'GET') {
        return next()
    }
    const token = req.header("token");
    if (!token) {
        return res.status(401).send("Authentication  Error")

    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET ?? "");
        if (decoded.user.id !== req.headers.userid) {
            return res.status(401).send("Unauthorized User.")

        }
        next();
    } catch (e: any) {
        return res.status(401).send(e.name === 'TokenExpiredError' ? e.message : "Invalid token")
    }
};