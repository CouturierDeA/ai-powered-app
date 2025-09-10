import Skeleton from 'react-loading-skeleton';
import type { ComponentProps } from 'react';

const ReviewSkeleton = ({ className }: ComponentProps<'div'>) => {
    return (
        <div className={`flex flex-col gap-5 ${className}`}>
            {[1, 2].map((i) => (
                <div key={i}>
                    <Skeleton width={150} />
                    <Skeleton width={100} />
                    <Skeleton count={2} />
                </div>
            ))}
        </div>
    );
};

export default ReviewSkeleton;
