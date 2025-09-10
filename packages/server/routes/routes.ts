import express from 'express';
import { chatController } from '../controllers/chat.controller.ts';
import { reviewsController } from '../controllers/reviews.controller.ts';
import { productsController } from '../controllers/products.controller.ts';

const router = express.Router();

router.post('/api/chat', chatController.sendMessage);

router.get('/api/products', productsController.getProducts);
router.get('/api/products/:id/reviews', reviewsController.getReviews);
router.get('/api/products/:id/summary', reviewsController.getReviewSummary);
router.post(
    '/api/products/:id/reviews/summarize',
    reviewsController.summarizeReviews
);

export default router;
