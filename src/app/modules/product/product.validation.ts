import { z } from "zod";

// Define the TVariants schema
const variantsValidatedSchema = z.object({
    type: z.string().min(1, { message: "Variant type is required" }),
    value: z.string().min(1, { message: "Variant value is required" }),
});

// Define the TInventory schema
const inventoryValidatedSchema = z.object({
    quantity: z
        .number()
        .nonnegative({ message: "Quantity must be a non-negative number" })
        .min(1, { message: "Quantity is required" }),
    inStock: z.boolean({ required_error: "In stock status is required" }),
});

// Define the TProduct schema
const productValidatedSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    price: z
        .number()
        .nonnegative({ message: "Price must be a non-negative number" })
        .min(1, { message: "Price is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    tags: z
        .array(z.string().min(1, { message: "Tags cannot be empty" }))
        .nonempty({ message: "Tags are required" }),
    variants: z
        .array(variantsValidatedSchema)
        .nonempty({ message: "Variants are required" }),
    inventory: inventoryValidatedSchema,
});

export default productValidatedSchema;
