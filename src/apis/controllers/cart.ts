import { Request, RequestHandler, Response } from "express";
import mongoose from 'mongoose';
import { cartModel } from "../../Models/cart";
import { CREATE, DELETE, sendError, UPDATE } from "../../utils/utils";


export const addToCart: RequestHandler = async (req: Request, res: Response) => {
    const userId = req.headers.userid;
    const itemId = req.headers.itemid;
    const cart = await cartModel.findOneAndUpdate(
        { userId: new mongoose.Types.ObjectId(userId?.toString()) },
        {
            $addToSet: {
                products: {
                    _id: new mongoose.Types.ObjectId(itemId?.toString()), quantity: 1
                }
            }
        }, { upsert: true })

    return CREATE(res, cart, "Item");

};
export const deleteFromCart: RequestHandler = async (req: Request, res: Response) => {
    const userId = req.headers.userid;
    const itemId = req.headers.itemid;
    const itemExist = await cartModel.findOne(
        { userId: userId, 'products._id': itemId },
    )
    if (!itemExist) { sendError(404, 'Item not found in cart.') }
    console.log('HEREEE', itemExist);

    const cart = await cartModel.updateOne(
        { userId: userId },
        {
            $pullAll: {
                products: [itemId]
            }
        }, () => {
            console.log('Callback');
        })

    return DELETE(res, cart, "Item");

};

export const updateCartItem: RequestHandler = async (req: Request, res: Response) => {
    const userId = req.headers.userid;
    const itemId = req.headers.itemid;
    const quantity = req.body.quantity;
    const itemExist = await cartModel.findOne(
        { userId: userId, 'products.itemId': itemId },
    )
    if (!itemExist) { sendError(404, 'Item not found in cart.') }
    const cart = await cartModel.findOneAndUpdate(
        { userId: userId, 'products.itemId': itemId },
        {
            $set: { "products.$.quantity": quantity, }
        })

    return UPDATE(res, cart, "Item");

};

