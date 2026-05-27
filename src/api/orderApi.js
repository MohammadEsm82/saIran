import axiosInstance from './axiosConfig';

const orderApi = {
    // ثبت سفارش
    createOrder: async () => {
        const response = await axiosInstance.post('/orders/checkout');
        return response.data;
    },

    // دریافت سفارشات من
    getMyOrders: async () => {
        const response = await axiosInstance.get('/orders/my-orders');
        return response.data;
    },

    // دریافت جزئیات سفارش
    getOrderById: async (id) => {
        const response = await axiosInstance.get(`/orders/${id}`);
        return response.data;
    },

    // ادمین: دریافت همه سفارشات
    getAllOrders: async (page = 1, limit = 20) => {
        const response = await axiosInstance.get(`/orders/admin/all?page=${page}&limit=${limit}`);
        return response.data;
    },

    // ادمین: تغییر وضعیت
    updateOrderStatus: async (id, status) => {
        const response = await axiosInstance.put(`/orders/admin/${id}/status`, { status });
        return response.data;
    }
};

export default orderApi;