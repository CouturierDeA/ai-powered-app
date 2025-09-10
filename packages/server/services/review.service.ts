import {reviewRepository} from "../repositories/review.repository.ts";
import {llmClient} from "../llm/client.ts";
import {productRepository} from "../repositories/product.repository.ts";
import {summarizeReviewsInstructions} from "../llm/prompts/instructions.ts";

async function summarizeReviews(productId: number, reviewsLimit = 10) {
    const summary = await reviewRepository.getReviewSummary(productId);

    if (summary && summary.expiresAt > new Date()) return summary.content;

    const reviews = await reviewRepository.getReviews(productId, reviewsLimit);

    const joinedReviews = reviews
        .map(item => item.content)
        .join('\n\n');

    const prompt = summarizeReviewsInstructions.replace('{{reviews}}', joinedReviews);

    const { text } = await llmClient.generateText({ prompt });

    await reviewRepository.storeReviewSummary(productId, text);

    return text;
}

export const reviewService = {
    getProducts: productRepository.getProducts,
    getReviews: reviewRepository.getReviews,
    getReviewSummary: reviewRepository.getReviewSummary,
    summarizeReviews,
}
