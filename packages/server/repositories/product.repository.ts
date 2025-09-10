import { PrismaClient } from '../generated/prisma/client.js';

export const reviewRepository = {
    getReviews(productId: number) {
        const prisma = new PrismaClient();
        return prisma.review.findMany({
            where: { id: productId },
            orderBy: { createdAt: 'desc' },
        });
    }
}
