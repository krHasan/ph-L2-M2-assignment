import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (orderData: TOrder) => {
    const result = await Order.create(orderData);
    return result;
};

const getAllOrders = async (email: string) => {
    if (email) {
        return await Order.find({ email }).exec();
    } else {
        return await Order.find().exec();
    }
};

export const OrderServices = {
    createOrder,
    getAllOrders,
};
