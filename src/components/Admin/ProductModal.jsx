import React, { useState, useEffect } from 'react';
import adminApi from '../../api/adminApi';
import LoadingSpinner from '../Common/LoadingSpinner';

const ProductModal = ({ isOpen, onClose, onSuccess, product, showAlert }) => {
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [formData, setFormData] = useState({
        pname: '',
        price: '',
        stock: '',
        score: '',
        description: '',
        images_url: [],
        detailTable: {}
    });
    const [detailKey, setDetailKey] = useState('');
    const [detailValue, setDetailValue] = useState('');

    useEffect(() => {
        if (product) {
            setFormData({
                pname: product.pname || '',
                price: product.price || '',
                stock: product.stock || '',
                score: product.score || '',
                description: product.description || '',
                images_url: product.images_url || [],
                detailTable: product.detailTable || {}
            });
        } else {
            setFormData({
                pname: '',
                price: '',
                stock: '',
                score: '',
                description: '',
                images_url: [],
                detailTable: {}
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // بررسی نوع فایل
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            showAlert('فرمت فایل مجاز نیست (JPEG, PNG, WEBP, GIF)', 'error');
            return;
        }

        // بررسی حجم (حداکثر 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showAlert('حجم فایل نباید بیشتر از 5 مگابایت باشد', 'error');
            return;
        }

        setUploadingImage(true);
        try {
            const result = await adminApi.uploadImage(file);
            if (result.success) {
                setFormData({
                    ...formData,
                    images_url: [...formData.images_url, result.data.url]
                });
                showAlert('عکس با موفقیت آپلود شد', 'success');
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در آپلود عکس', error);
        } finally {
            setUploadingImage(false);
        }
    };

    const removeImage = async (index) => {
        const imageUrl = formData.images_url[index];
        const filename = imageUrl.split('/').pop();
        
        if (filename) {
            try {
                await adminApi.deleteImage(filename);
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }
        
        const newImages = [...formData.images_url];
        newImages.splice(index, 1);
        setFormData({
            ...formData,
            images_url: newImages
        });
    };

    const addDetail = () => {
        if (detailKey && detailValue) {
            setFormData({
                ...formData,
                detailTable: {
                    ...formData.detailTable,
                    [detailKey]: detailValue
                }
            });
            setDetailKey('');
            setDetailValue('');
        }
    };

    const removeDetail = (key) => {
        const newDetails = { ...formData.detailTable };
        delete newDetails[key];
        setFormData({
            ...formData,
            detailTable: newDetails
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.pname || !formData.price) {
            showAlert('نام محصول و قیمت الزامی است', 'error');
            return;
        }

        setLoading(true);
        try {
            const submitData = {
                ...formData,
                price: parseInt(formData.price),
                stock: parseInt(formData.stock) || 0,
                score: parseInt(formData.score) || 0
            };

            let result;
            if (product) {
                result = await adminApi.updateProduct(product.id, submitData);
            } else {
                result = await adminApi.createProduct(submitData);
            }

            if (result.success) {
                showAlert(product ? 'محصول با موفقیت ویرایش شد' : 'محصول با موفقیت ایجاد شد', 'success');
                onSuccess();
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در ذخیره محصول', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                    <h3 className="text-xl font-bold">
                        {product ? 'ویرایش محصول' : 'افزودن محصول جدید'}
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* نام محصول */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            نام محصول *
                        </label>
                        <input
                            type="text"
                            name="pname"
                            value={formData.pname}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right"
                            required
                        />
                    </div>

                    {/* قیمت و موجودی */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                قیمت (تومان) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                موجودی
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left"
                            />
                        </div>
                    </div>

                    {/* امتیاز */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            امتیاز (0-10)
                        </label>
                        <input
                            type="number"
                            name="score"
                            value={formData.score}
                            onChange={handleChange}
                            min="0"
                            max="10"
                            step="0.1"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left"
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
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right"
                        />
                    </div>

                    {/* آپلود تصاویر */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            تصاویر محصول
                        </label>
                        
                        {/* دکمه آپلود */}
                        <div className="mb-2">
                            <label className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
                                {uploadingImage ? <LoadingSpinner size="sm" /> : '📤 انتخاب و آپلود عکس'}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={uploadingImage}
                                />
                            </label>
                            <p className="text-xs text-gray-500 mt-1">
                                فرمت‌های مجاز: JPEG, PNG, WEBP, GIF | حداکثر حجم: 5MB
                            </p>
                        </div>

                        {/* لیست تصاویر */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.images_url.map((url, index) => (
                                <div key={index} className="relative bg-gray-100 rounded-lg p-2 flex items-center gap-2">
                                    <span className="text-xs text-gray-600 truncate max-w-[200px]">
                                        {url.split('/').pop()}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* مشخصات فنی */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            مشخصات فنی
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={detailKey}
                                onChange={(e) => setDetailKey(e.target.value)}
                                placeholder="کلید (مثال: رنگ)"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-right"
                            />
                            <input
                                type="text"
                                value={detailValue}
                                onChange={(e) => setDetailValue(e.target.value)}
                                placeholder="مقدار (مثال: مشکی)"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-right"
                            />
                            <button
                                type="button"
                                onClick={addDetail}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                            >
                                افزودن
                            </button>
                        </div>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                            {Object.entries(formData.detailTable).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center bg-gray-50 rounded-lg p-2">
                                    <span className="text-sm">
                                        <strong>{key}:</strong> {value}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeDetail(key)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        حذف
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* دکمه‌ها */}
                    <div className="flex gap-3 pt-4 border-t">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 flex items-center justify-center gap-2"
                        >
                            {loading && <LoadingSpinner size="sm" />}
                            {product ? 'ذخیره تغییرات' : 'ایجاد محصول'}
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

export default ProductModal;