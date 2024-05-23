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

const getProductById = async (productId: string) => {
    // const result = await Product.aggregate([{ $match: { id: productId } }]);
    const result = await Product.findById(productId).exec();
    return result;
};

const updateProductById = async (productId: string, updateData: TProduct) => {
    const result = await Product.findByIdAndUpdate(productId, updateData, {
        new: true,
    }).exec();
    return result;
};

const deleteProductById = async (productId: string) => {
    const result = await Product.deleteOne({ _id: productId }).exec();
    return result;
};

export const ProductServices = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
};
