import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (productData: TProduct) => {
    const result = await Product.create(productData);
    return result;
};

const getAllProducts = async (searchTerm: string) => {
    if (searchTerm) {
        const searchPattern = new RegExp(searchTerm, "i");
        return await Product.find({
            $or: [
                { name: searchPattern },
                { description: searchPattern },
                { category: searchPattern },
                { tags: searchPattern },
            ],
        }).exec();
    } else {
        return await Product.find();
    }
};

const getProductById = async (id: string) => {
    const result = await Product.aggregate([{ $match: { id: id } }]);
    return result;
};

export const ProductServices = {
    createProduct,
    getAllProducts,
    getProductById,
};
