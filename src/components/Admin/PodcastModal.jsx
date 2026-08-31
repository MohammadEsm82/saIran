import React, { useState, useEffect } from 'react';
import podcastApi from '../../api/podcastApi';
import LoadingSpinner from '../Common/LoadingSpinner';

const PodcastModal = ({ isOpen, onClose, onSuccess, podcast, showAlert }) => {
    const [loading, setLoading] = useState(false);
    const [uploadingAudio, setUploadingAudio] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        audio_url: '',
        tags: '',
        duration: ''
    });

    useEffect(() => {
        if (podcast) {
            setFormData({
                title: podcast.title || '',
                description: podcast.description || '',
                image_url: podcast.image_url || '',
                audio_url: podcast.audio_url || '',
                tags: podcast.tags || '',
                duration: podcast.duration || ''
            });
        } else {
            setFormData({
                title: '',
                description: '',
                image_url: '',
                audio_url: '',
                tags: '',
                duration: ''
            });
        }
    }, [podcast]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAudioUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a'];
        if (!allowedTypes.includes(file.type)) {
            showAlert('فرمت فایل مجاز نیست (MP3, WAV, OGG, M4A)', 'error');
            return;
        }

        if (file.size > 50 * 1024 * 1024) {
            showAlert('حجم فایل نباید بیشتر از 50 مگابایت باشد', 'error');
            return;
        }

        setUploadingAudio(true);
        try {
            const result = await podcastApi.uploadAudio(file);
            if (result.success) {
                setFormData(prev => ({ ...prev, audio_url: result.data.url }));
                showAlert('فایل صوتی با موفقیت آپلود شد', 'success');
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در آپلود فایل صوتی', 'error');
            console.error(error);
        } finally {
            setUploadingAudio(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            showAlert('فرمت فایل مجاز نیست (JPEG, PNG, WEBP)', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            showAlert('حجم فایل نباید بیشتر از 5 مگابایت باشد', 'error');
            return;
        }

        setUploadingImage(true);
        try {
            const result = await podcastApi.uploadImage(file);
            if (result.success) {
                setFormData(prev => ({ ...prev, image_url: result.data.url }));
                showAlert('تصویر با موفقیت آپلود شد', 'success');
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در آپلود تصویر', 'error');
            console.error(error);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title || !formData.audio_url) {
            showAlert('عنوان و فایل صوتی الزامی است', 'error');
            return;
        }

        setLoading(true);
        try {
            let result;
            if (podcast) {
                result = await podcastApi.updatePodcast(podcast.id, formData);
            } else {
                result = await podcastApi.createPodcast(formData);
            }

            if (result.success) {
                showAlert(podcast ? 'پادکست با موفقیت ویرایش شد' : 'پادکست با موفقیت ایجاد شد', 'success');
                onSuccess();
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در ذخیره پادکست', 'error');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex:99999 }} >
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold">
                        {podcast ? 'ویرایش پادکست' : 'افزودن پادکست جدید'}
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* عنوان */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            عنوان *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right"
                            required
                        />
                    </div>

                    {/* توضیحات */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            توضیحات
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right"
                        />
                    </div>

                    {/* مدت زمان */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            مدت زمان (مثال: 25:30)
                        </label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="دقیقه:ثانیه"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left"
                            dir="ltr"
                        />
                    </div>

                    {/* تگ‌ها */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            تگ‌ها (با کاما جدا کنید)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="علمی, پربازدید, جدیدترین"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left"
                            dir="ltr"
                        />
                        <p className="text-xs text-gray-500 mt-1 text-right">
                            مثال: جدیدترین, علمی, پربازدید
                        </p>
                    </div>

                    {/* آپلود فایل صوتی */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            فایل صوتی *
                        </label>
                        <div className="flex gap-2">
                            <label className="flex-1 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 text-center">
                                {uploadingAudio ? <LoadingSpinner size="sm" /> : ' آپلود فایل صوتی'}
                                <input
                                    type="file"
                                    accept="audio/*"
                                    onChange={handleAudioUpload}
                                    className="hidden"
                                    disabled={uploadingAudio}
                                />
                            </label>
                            {formData.audio_url && (
                                <div className="flex-1 bg-gray-100 rounded-lg p-2 text-center text-sm truncate">
                                    {formData.audio_url.split('/').pop()}
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">
                            فرمت‌های مجاز: MP3, WAV, OGG, M4A | حداکثر حجم: 50MB
                        </p>
                    </div>

                    {/* آپلود تصویر */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            تصویر کاور
                        </label>
                        <div className="flex gap-2">
                            <label className="flex-1 inline-block px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 text-center">
                                {uploadingImage ? <LoadingSpinner size="sm" /> : ' آپلود تصویر'}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={uploadingImage}
                                />
                            </label>
                            {formData.image_url && (
                                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                                    <img
                                        src={`http://localhost:3000${formData.image_url}`}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">
                            فرمت‌های مجاز: JPEG, PNG, WEBP | حداکثر حجم: 5MB
                        </p>
                    </div>

                    {/* دکمه‌ها */}
                    <div className="flex gap-3 pt-4 border-t">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 flex items-center justify-center gap-2"
                        >
                            {loading && <LoadingSpinner size="sm" />}
                            {podcast ? 'ذخیره تغییرات' : 'ایجاد پادکست'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            انصراف
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PodcastModal;