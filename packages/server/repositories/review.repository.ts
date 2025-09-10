import { PrismaClient } from '../generated/prisma/client.js';
import { addDays } from 'date-fns';

const prisma = new PrismaClient();

export const reviewRepository = {
    getReviews(productId: number, limit?: number) {
        return prisma.review.findMany({
            where: { productId },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    },
    async getReviewSummary(productId: number) {
        const summary = await prisma.summary.findFirst({
            where: {
                AND: [{ productId }, { expiresAt: { gt: new Date() } }],
            },
        });
        return summary?.content ?? null;
    },
    storeReviewSummary(productId: number, summary: string) {
        const now = new Date();
        const expiresAt = addDays(now, 7);
        const payload = {
            content: summary,
            expiresAt,
            generatedAt: now,
            productId,
        };
        return prisma.summary.upsert({
            where: { productId },
            create: payload,
            update: payload,
        });
    },
};
