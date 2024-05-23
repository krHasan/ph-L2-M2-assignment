import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import orderValidatedSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const data = orderValidatedSchema.parse(orderData);
        const result = await OrderServices.createOrder(data);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            data: error,
        });
    }
};

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const email = req.query?.email;
        const result = await OrderServices.getAllOrders(email as string);
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            data: error,
        });
    }
};

export const OrderControllers = {
    createOrder,
    getAllOrders,
};
