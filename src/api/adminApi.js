import axiosInstance from './axiosConfig';

const adminApi = {
  // ========== آپلود عکس ==========
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await axiosInstance.post('/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  
  deleteImage: async (filename) => {
    const response = await axiosInstance.delete(`/admin/upload/${filename}`);
    return response.data;
  },

  // ========== داشبورد ==========
  getDashboardStats: async () => {
    const response = await axiosInstance.get('/admin/dashboard/stats');
    return response.data;
  },

  // ========== مدیریت محصولات ==========
  getAllProducts: async (page = 1, limit = 20) => {
    const response = await axiosInstance.get(`/admin/products?page=${page}&limit=${limit}`);
    return response.data;
  },
  
  createProduct: async (productData) => {
    const response = await axiosInstance.post('/admin/products', productData);
    return response.data;
  },
  
  updateProduct: async (id, productData) => {
    const response = await axiosInstance.put(`/admin/products/${id}`, productData);
    return response.data;
  },
  
  deleteProduct: async (id) => {
    const response = await axiosInstance.delete(`/admin/products/${id}`);
    return response.data;
  },
  
  searchProducts: async (keyword, page = 1, limit = 20) => {
    const response = await axiosInstance.get(`/admin/products/search?q=${keyword}&page=${page}&limit=${limit}`);
    return response.data;
  },

  // ========== مدیریت سفارشات ==========
  getAllOrders: async (page = 1, limit = 20) => {
    const response = await axiosInstance.get(`/admin/orders?page=${page}&limit=${limit}`);
    return response.data;
  },
  
  getOrderDetails: async (id) => {
    const response = await axiosInstance.get(`/admin/orders/${id}`);
    return response.data;
  },
  
  updateOrderStatus: async (id, status) => {
    const response = await axiosInstance.put(`/admin/orders/${id}/status`, { status });
    return response.data;
  }
};

export default adminApi;