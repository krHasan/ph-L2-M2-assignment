import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (orderData: TOrder) => {
    const session = await Order.startSession();
    session.startTransaction();
    try {
        //first find the product
        const product = await Product.findById(orderData.productId).session(
            session
        );

        //checking whether the product is available or not
        if (!product) {
            throw new Error("Product not found");
        }

        //checking the stock
        if (product.inventory.quantity < orderData.quantity) {
            throw new Error("Not enough stock available");
        }

        //updating the quantity
        product.inventory.quantity -= orderData.quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        await product.save({ session });

        const order = new Order(orderData);
        await order.save({ session });

        await session.commitTransaction();
        return order;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
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
