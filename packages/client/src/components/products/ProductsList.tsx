import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/components/products/productsApi.ts';
import ReviewSkeleton from '@/components/reviews/ReviewSkeleton.tsx';
import { type ComponentProps } from 'react';
import { Link } from 'react-router-dom';

const ProductsList = ({ className }: ComponentProps<'div'>) => {
    const productsQuery = useQuery({
        queryKey: [],
        queryFn: productsApi.fetchProducts,
    });

    if (productsQuery.isLoading) {
        return <ReviewSkeleton className={className} />;
    }

    if (productsQuery.isError) {
        return (
            <div className={`flex flex-col gap-5 ${className}>}`}>
                <p className="text-red-500">
                    Could not fetch products. Try again!
                </p>
            </div>
        );
    }

    const products = productsQuery.data;

    if (!products?.length) {
        return (
            <div className="text-gray-500 font-semibold">
                No products to show
            </div>
        );
    }

    function w100(index: number, self: any[]) {
        const full = index % 2 === 0 && index === self.length - 1;
        return full ? 'col-span-full' : '';
    }

    return (
        <div className={`grid grid-cols-2 gap-5 items-stretch ${className}>}`}>
            {products.map((product, index, self) => (
                <div
                    key={product.id}
                    className={`flex flex-col gap-4 bg-white rounded-lg ${w100(index, self)}`}
                >
                    <div className="font-semibold">{product.name}</div>
                    <p>{product.description}</p>
                    <Link
                        className="self-end font-medium text-blue-600 hover:underline mt-auto"
                        to={`/product/${product.id}/reviews`}
                    >
                        Reviews
                    </Link>
                    <div className="divide-accent bg-gray-200 h-0.5" />
                </div>
            ))}
        </div>
    );
};

export default ProductsList;
