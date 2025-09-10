import { productRepository } from '../repositories/product.repository.ts';

export const productService = {
    getProducts: productRepository.getProducts,
    getProduct: productRepository.getProduct,
};
