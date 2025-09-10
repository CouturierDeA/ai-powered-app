import axios from 'axios';

export type Product = {
    id: number;
    name: string;
    description: string | null;
    price: number;
};

export const productsApi = {
    async fetchProducts() {
        const res = await axios.get<Product[]>('/api/products/');
        return res.data;
    },
};
