import { PrismaClient } from '../generated/prisma/client.js';

const client = new PrismaClient();

export const productRepository = {
    getProducts() {
        return client.product.findMany();
    },
    getProduct(id: number) {
        return client.product.findUnique({
            where: { id },
        });
    },
};
