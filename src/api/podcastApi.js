import axiosInstance from './axiosConfig';

const podcastApi = {
    //  کاربران عادی
    getPodcasts: async (page = 1, limit = 20) => {
        const response = await axiosInstance.get(`/podcasts?page=${page}&limit=${limit}`);
        return response.data;
    },
    //مشخصات پادکست
    getPodcastById: async (id) => {
        const response = await axiosInstance.get(`/podcasts/${id}`);
        return response.data;
    },

    searchPodcasts: async (keyword, page = 1, limit = 20) => {
        const response = await axiosInstance.get(`/podcasts/search?q=${keyword}&page=${page}&limit=${limit}`);
        return response.data;
    },

    getPopularPodcasts: async (limit = 10) => {
        const response = await axiosInstance.get(`/podcasts/popular?limit=${limit}`);
        return response.data;
    },

    getLatestPodcasts: async (limit = 10) => {
        const response = await axiosInstance.get(`/podcasts/latest?limit=${limit}`);
        return response.data;
    },

    //  ادمین
    getAllPodcastsAdmin: async (page = 1, limit = 20) => {
        const response = await axiosInstance.get(`/podcasts/admin/podcasts?page=${page}&limit=${limit}`);
        return response.data;
    },

    createPodcast: async (podcastData) => {
        const response = await axiosInstance.post('/podcasts/admin/podcasts', podcastData);
        return response.data;
    },

    updatePodcast: async (id, podcastData) => {
        const response = await axiosInstance.put(`/podcasts/admin/podcasts/${id}`, podcastData);
        return response.data;
    },

    deletePodcast: async (id) => {
        const response = await axiosInstance.delete(`/podcasts/admin/podcasts/${id}`);
        return response.data;
    },

    uploadAudio: async (file) => {
        const formData = new FormData();
        formData.append('audio', file);
        const response = await axiosInstance.post('/podcasts/admin/upload-audio', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        const response = await axiosInstance.post('/podcasts/admin/upload-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }
};

export default podcastApi;