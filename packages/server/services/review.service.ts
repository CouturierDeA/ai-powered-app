import { reviewRepository } from '../repositories/review.repository.ts';
import { llmClient } from '../llm/client.ts';
import { summarizeReviewsInstructions } from '../llm/prompts/instructions.ts';

async function summarizeReviews(productId: number, reviewsLimit = 10) {
    const summary = await reviewRepository.getReviewSummary(productId);

    if (summary) return summary;

    const reviews = await reviewRepository.getReviews(productId, reviewsLimit);

    const joinedReviews = reviews.map((item) => item.content).join('\n\n');

    const prompt = summarizeReviewsInstructions.replace(
        '{{reviews}}',
        joinedReviews
    );

    const text = await llmClient.summarizeReviews({ prompt });

    await reviewRepository.storeReviewSummary(productId, text);

    return text;
}

export const reviewService = {
    getReviews: reviewRepository.getReviews,
    getReviewSummary: reviewRepository.getReviewSummary,
    summarizeReviews,
};
