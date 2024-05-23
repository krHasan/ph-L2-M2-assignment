import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (productData: TProduct) => {
    const result = await Product.create(productData);
    return result;
};

const getProductById = async (id: string) => {
    const result = await Product.aggregate([{ $match: { id: id } }]);
    return result;
};

export const ProductServices = {
    createProduct,
    getProductById,
};
