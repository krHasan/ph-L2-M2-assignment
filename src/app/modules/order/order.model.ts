import { Schema, model, connect } from "mongoose";
import { TOrder } from "./order.interface";
import validator from "validator";

const orderSchema = new Schema<TOrder>({
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: "{VALUE} is not a valid email",
        },
    },
    productId: {
        type: String,
        required: [true, "Product ID is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
    },
});

export const Order = model<TOrder>("Order", orderSchema);
