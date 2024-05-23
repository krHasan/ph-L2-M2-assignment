import { z } from "zod";

// Define the Zod schema for TOrder
const orderValidatedSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    productId: z.string().min(1, { message: "Product ID is required" }),
    price: z
        .number()
        .nonnegative({ message: "Price must be a non-negative number" }),
    quantity: z
        .number()
        .int()
        .positive({ message: "Quantity must be a positive integer" }),
});

export default orderValidatedSchema;
