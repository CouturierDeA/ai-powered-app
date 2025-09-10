import { PrismaClient } from '../generated/prisma/client.js';

export const summaryRepository = {
    getProductSummary(productId: number) {
        return new PrismaClient().summary.findFirst({
            where: { productId: productId },
        });
    },
};
