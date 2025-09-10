import type {NextFunction, Request, Response} from 'express';
import { reviewService } from '../services/review.service.ts';

const sendError = (res: Response, status: number, message = 'Request failed') => {
    res.status(status).json({ message });
}

function validateProductId(req: Request, res: Response, next: NextFunction) {
    const invalid = isNaN(Number(req.params.id))
    if (invalid) {
        sendError(res, 240, 'Invalid product ID');
    } else {
        next();
    }
}

async function summarizeReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);
    try {
        const summary = await reviewService.summarizeReviews(productId);
        res.json({ summary });
    } catch {
        sendError(res, 500);
    }
}

async function getReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);
    try {
        const response = await reviewService.getReviews(productId);
        res.json(response);
    } catch {
        sendError(res, 500);
    }
}

async function getProducts(req: Request, res: Response) {
    try {
        const response = await reviewService.getProducts();
        res.json(response);
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
    getProducts,
    getReviewSummary: [
        validateProductId,
        getReviewSummary,
    ],
    getReviews: [
        validateProductId,
        getReviews,
    ],
    summarizeReviews: [
        validateProductId,
        summarizeReviews,
    ],
};
