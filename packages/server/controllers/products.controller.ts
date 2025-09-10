import type { Request, Response } from 'express';
import { productService } from '../services/product.service.ts';

const sendError = (
    res: Response,
    status: number,
    message = 'Request failed'
) => {
    res.status(status).json({ message });
};

async function getProducts(req: Request, res: Response) {
    try {
        const response = await productService.getProducts();
        res.json(response);
    } catch {
        sendError(res, 500);
    }
}

async function getProduct(req: Request, res: Response) {
    const invalid = isNaN(Number(req.params.id));
    if (invalid) {
        sendError(res, 240, 'Invalid product ID');
        return;
    }
    try {
        const productId = Number(req.params.id);
        const response = await productService.getProduct(productId);
        res.json(response);
    } catch {
        sendError(res, 500);
    }
}

export const productsController = {
    getProducts,
    getProduct,
};
