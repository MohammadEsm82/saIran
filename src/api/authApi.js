import axiosInstance from './axiosConfig';

const authApi = {
    // ارسال OTP
    sendOtp: async (phoneNumber) => {
        const response = await axiosInstance.post('/auth/send-otp', { phoneNumber });
        return response.data;
    },

    // ورود / ثبت نام
    login: async (data) => {
        const response = await axiosInstance.post('/auth/login', data);
        if (response.data.success) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },

    // خروج
    logout: async () => {
        const response = await axiosInstance.post('/auth/logout');
        if (response.data.success) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        return response.data;
    },

    // دریافت پروفایل
    getProfile: async () => {
        const response = await axiosInstance.get('/auth/profile');
        return response.data;
    },

    // ویرایش پروفایل
    updateProfile: async (data) => {
        const response = await axiosInstance.put('/auth/profile', data);
        if (response.data.success) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        return response.data;
    },

    // درخواست تغییر شماره
    requestPhoneChange: async (newPhoneNumber) => {
        const response = await axiosInstance.post('/auth/profile/change-phone', { newPhoneNumber });
        return response.data;
    },

    // تایید تغییر شماره
    confirmPhoneChange: async (tempToken, code) => {
        const response = await axiosInstance.post('/auth/profile/confirm-phone', { tempToken, code });
        if (response.data.success) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        return response.data;
    },

    // حذف حساب
    deleteAccount: async () => {
        const response = await axiosInstance.delete('/auth/profile');
        if (response.data.success) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        return response.data;
    },

    // دریافت کاربر فعلی
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // بررسی احراز هویت
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export default authApi;