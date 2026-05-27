import axiosInstance from './axiosConfig';

const cartApi = {
    // دریافت سبد خرید
    getCart: async () => {
        const response = await axiosInstance.get('/cart');
        return response.data;
    },

    // افزودن به سبد خرید
    addToCart: async (productId, quantity = 1) => {
        const response = await axiosInstance.post('/cart/add', { productId, quantity });
        return response.data;
    },

    // ویرایش آیتم سبد خرید
    updateCartItem: async (productId, quantity) => {
        const response = await axiosInstance.put('/cart/update', { productId, quantity });
        return response.data;
    },

    // حذف از سبد خرید
    removeFromCart: async (productId) => {
        const response = await axiosInstance.delete(`/cart/remove/${productId}`);
        return response.data;
    }
};

export default cartApi;