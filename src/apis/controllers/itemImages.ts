import { Request, RequestHandler, Response } from "express";
import { UPDATE } from "../../utils";

export const uploadItemImages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  return UPDATE(res, {}, "Item images");
};

