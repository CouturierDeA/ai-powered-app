import { useMutation, useQuery } from '@tanstack/react-query';
import { HiSparkles } from 'react-icons/hi2';
import { Button } from '../ui/button';
import ReviewSkeleton from './ReviewSkeleton';
import StarRating from './StarRating';
import { useParams } from 'react-router-dom';
import {
    type GetReviewsResponse,
    reviewsApi,
    type SummarizeResponse,
} from './reviewsApi';
import ReactMarkdown from 'react-markdown';
import type { ComponentProps } from 'react';

const Template = ({ className, children }: ComponentProps<'div'>) => {
    return <div className={`flex flex-col gap-5 ${className}`}>{children}</div>;
};

const ReviewList = () => {
    const params = useParams();

    const productId = Number(params.productId);

    if (Number.isNaN(productId)) {
        return <Template>Invalid product id {params.productId}</Template>;
    }

    const summaryMutation = useMutation<SummarizeResponse>({
        mutationFn: () => reviewsApi.summarizeReviews(productId),
    });

    const reviewsQuery = useQuery<GetReviewsResponse>({
        queryKey: ['reviews', productId],
        queryFn: () => reviewsApi.fetchReviews(productId),
    });

    if (reviewsQuery.isLoading) {
        return (
            <Template>
                {[1, 2, 3].map((i) => (
                    <ReviewSkeleton key={i} />
                ))}
            </Template>
        );
    }

    if (reviewsQuery.isError) {
        return (
            <Template className="text-red-500">
                Could not fetch reviews. Try again!
            </Template>
        );
    }

    if (!reviewsQuery.data?.reviews.length) {
        return (
            <Template className="flex flex-col gap-5 font-semibold">
                No reviews
            </Template>
        );
    }

    const currentSummary =
        reviewsQuery.data.summary || summaryMutation.data?.summary;

    return (
        <Template className="flex flex-col gap-5">
            {reviewsQuery.data?.reviews.map((review) => (
                <article key={review.id}>
                    <div className="font-semibold">{review.author}</div>
                    <div>
                        <StarRating value={review.rating} />
                    </div>
                    <p className="py-2">{review.content}</p>
                </article>
            ))}
            {currentSummary ? (
                <footer className="flex flex-col gap-5">
                    <div className="divide-accent bg-gray-200 h-0.5" />
                    <div className="font-semibold">Summary:</div>
                    <div>
                        <ReactMarkdown>{currentSummary}</ReactMarkdown>
                    </div>
                </footer>
            ) : (
                <div>
                    <Button
                        onClick={() => summaryMutation.mutate()}
                        className="cursor-pointer align-start"
                        disabled={summaryMutation.isPending}
                    >
                        <HiSparkles />
                        Summarize
                    </Button>
                    {summaryMutation.isPending && (
                        <div className="py-3">
                            <ReviewSkeleton />
                        </div>
                    )}
                    {summaryMutation.isError && (
                        <div className="text-red-500">
                            <p>Could not summarize reviews. Try again!</p>
                            <p>{summaryMutation.error.message}</p>
                        </div>
                    )}
                </div>
            )}
        </Template>
    );
};

export default ReviewList;
