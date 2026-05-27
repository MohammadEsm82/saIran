import axiosInstance from './axiosConfig';

const productApi = {
    // دریافت لیست محصولات
    getProducts: async (page = 1, limit = 20) => {
        const response = await axiosInstance.get(`/products?page=${page}&limit=${limit}`);
        return response.data;
    },

    // دریافت محصولات برتر
    getTopRated: async (limit = 10) => {
        const response = await axiosInstance.get(`/products/top-rated?limit=${limit}`);
        return response.data;
    },

    // دریافت جزئیات محصول
    getProductById: async (id) => {
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data;
    }
};

export default productApi;