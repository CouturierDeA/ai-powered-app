import axios from 'axios';
// import { type Review } from '../../../../server/generated/prisma/client'

export type Review = {
    id: number;
    author: string;
    content: string;
    rating: number;
    createdAt: string;
};

export type GetReviewsResponse = {
    summary: string | null;
    reviews: Review[];
};

export type SummarizeResponse = {
    summary: string;
};

export const reviewsApi = {
    async fetchReviews(productId: number) {
        const res = await axios.get<GetReviewsResponse>(
            `/api/products/${productId}/reviews`
        );
        return res.data;
    },

    async summarizeReviews(productId: number) {
        const res = await axios.post<SummarizeResponse>(
            `/api/products/${productId}/reviews/summarize`
        );
        return res.data;
    },
};
