import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productValidatedSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const data = productValidatedSchema.parse(productData);
        const result = await ProductServices.createProduct(data);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
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

export const ProductControllers = {
    createProduct,
};
