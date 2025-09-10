import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

async function main() {
    // Seed Products
    await prisma.product.createMany({
        data: [
            {
                id: 1,
                name: 'Premium Wireless Headphones',
                description:
                    'Noise-cancelling headphones with exceptional sound quality and long battery life.',
                price: 299.99,
            },
            {
                id: 2,
                name: 'Ultra-thin Laptop',
                description:
                    'A lightweight laptop with powerful performance and a stunning display.',
                price: 1299.99,
            },
            {
                id: 3,
                name: 'High-performance Smartwatch',
                description:
                    'Track fitness metrics and receive notifications with this advanced smartwatch.',
                price: 349.99,
            },
            {
                id: 4,
                name: 'Ergonomic Office Chair',
                description:
                    'Designed for comfort during long work hours with lumbar support and adjustable height.',
                price: 499.99,
            },
            {
                id: 5,
                name: 'Professional DSLR Camera',
                description:
                    'Capture stunning photos and videos with this professional-grade camera.',
                price: 1499.99,
            },
        ],
        skipDuplicates: true, // Prevents errors if re-running seed
    });

    // Seed Reviews
    await prisma.review.createMany({
        data: [
            {
                id: 1,
                author: 'Alex Johnson',
                rating: 5,
                content:
                    'The sound quality on this pair of headphones is absolutely superb! The noise cancellation keeps me focused even in noisy environments. Battery lasts all day with moderate use.',
                productId: 1,
            },
            {
                id: 2,
                author: 'Sarah Miller',
                rating: 4,
                content:
                    'These headphones are incredibly comfortable for long sessions. The audio quality is excellent and the fit adjusts perfectly to my ear shape.',
                productId: 1,
            },
            {
                id: 3,
                author: 'David Wilson',
                rating: 3,
                content:
                    'Good sound quality overall. However, I found the ear cushions to be slightly too firm after four hours of use.',
                productId: 1,
            },
            {
                id: 4,
                author: 'Emily Davis',
                rating: 5,
                content:
                    'Purchasing this laptop was the best decision! The keyboard is nice and responsive. For travel I appreciate how lightweight it is.',
                productId: 2,
            },
            {
                id: 5,
                author: 'Michael Brown',
                rating: 4,
                content:
                    'The screen brightness makes working outdoors easy. Performance exceeds expectations for this slim design. Great value!',
                productId: 2,
            },
            {
                id: 6,
                author: 'Jessica Lee',
                rating: 3,
                content:
                    'Keyboard is mediocre. Screen resolution good but not exceptional.',
                productId: 2,
            },
            {
                id: 7,
                author: 'Daniel Garcia',
                rating: 4,
                content:
                    'This watch tracks my runs exceptionally well. Battery drain is minimal even with continuous GPS.',
                productId: 3,
            },
            {
                id: 8,
                author: 'Lisa Thompson',
                rating: 5,
                content:
                    "Wow! The battery life on this smartwatch doesn't seem possible. Always fully charged!",
                productId: 3,
            },
            {
                id: 9,
                author: 'Kevin Martinez',
                rating: 2,
                content:
                    'Battery draining very fast. Also inaccurate heart rate readings.',
                productId: 3,
            },
            {
                id: 10,
                author: 'Robert Kim',
                rating: 5,
                content:
                    'This chair saved my back from aches after months of sitting at the desk. The lumbar support is perfect!',
                productId: 4,
            },
            {
                id: 11,
                author: 'Patricia Wilson',
                rating: 3,
                content:
                    'Chair was comfortable for maybe three hours before I started to feel stiffness again.',
                productId: 4,
            },
            {
                id: 12,
                author: 'Christopher Moore',
                rating: 5,
                content:
                    'Purchased this for home office work - it has become my favorite piece of furniture!',
                productId: 4,
            },
            {
                id: 13,
                author: 'Matthew Johnson',
                rating: 4,
                content:
                    'This camera performs better than my previous point-and-shoot. Amazing low-light capabilities!',
                productId: 5,
            },
            {
                id: 14,
                author: 'Amanda Harris',
                rating: 5,
                content:
                    'I captured wedding photos that turned out amazing! The autofocus works beautifully.',
                productId: 5,
            },
            {
                id: 15,
                author: 'James Peterson',
                rating: 3,
                content:
                    'Battery life worse than expected. Also the touchscreen became unresponsive after an hour of use.',
                productId: 5,
            },
        ],
        skipDuplicates: true,
    });

    console.log('✅ Seeding complete.');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed: ', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
