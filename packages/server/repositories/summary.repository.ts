import { PrismaClient } from '../generated/prisma/client.js';

export const productRepository = {
    getProducts() {
        return new PrismaClient().product.findMany();
    }
}
