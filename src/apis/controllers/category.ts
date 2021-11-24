import { Request, RequestHandler, Response } from "express";
import { categoryModel } from "../../Models/index";
import { CREATE, GET } from "../../utils";


export const addCategory: RequestHandler = async (req: Request, res: Response) => {
    let newCategory = new categoryModel({ ...req.body })
    const result = await newCategory.save();
    return CREATE(res, result, "Item");
};


interface getCategoryQuery {
    page: number,
    limit: number,
    sort: string,
    order: number,
    filters: any
}
export const getCategories: RequestHandler = async (req: Request, res: Response) => {
    const { page = 1, limit = 30, sort='categoryName', order=1, ...filters } = req.query as unknown as getCategoryQuery

    const data = await categoryModel.paginate({ ...filters }, {
        sort: { [sort]: order },
        limit: limit,
        offset: limit * (page - 1),
        page: page
    })
    return GET(res, {}, "Categories");
}
