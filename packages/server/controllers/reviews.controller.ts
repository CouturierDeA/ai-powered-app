import type { NextFunction, Request, Response } from 'express';
import { reviewService } from '../services/review.service.ts';
import { productService } from '../services/product.service.ts';

const sendError = (
    res: Response,
    status: number,
    message = 'Request failed'
) => {
    res.status(status).json({ message });
};

async function validateProductId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const productId = Number(req.params.id);
        const invalidId = isNaN(productId);
        if (invalidId) {
            sendError(res, 240, 'Invalid product ID');
            return;
        }
        const product = await productService.getProduct(productId);
        if (!product) {
            sendError(res, 404, 'Product does not exist');
            return;
        }
        next();
    } catch {
        sendError(res, 500);
    }
}

async function summarizeReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);
    try {
        const reviews = await reviewService.getReviews(productId, 1);
        if (!reviews.length) {
            sendError(res, 400, 'There are no reviews to summarize');
            return;
        }
        const summary = await reviewService.summarizeReviews(productId);
        res.json({ summary });
    } catch {
        sendError(res, 500);
    }
}

async function getReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);
    try {
        const reviews = await reviewService.getReviews(productId);
        const summary = await reviewService.getReviewSummary(productId);
        res.json({
            reviews,
            summary,
        });
    } catch {
        sendError(res, 500);
    }
}

async function getReviewSummary(req: Request, res: Response) {
    try {
        const productId = Number(req.params.id);
        const response = await reviewService.getReviewSummary(productId);
        res.json(response);
    } catch {
        sendError(res, 500);
    }
}

export const reviewsController = {
    getReviewSummary: [validateProductId, getReviewSummary],
    getReviews: [validateProductId, getReviews],
    summarizeReviews: [validateProductId, summarizeReviews],
};
