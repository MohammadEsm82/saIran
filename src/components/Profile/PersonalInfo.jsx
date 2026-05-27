import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const PersonalInfo = ({ user, showAlert }) => {
    const { updateProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fname: user?.fname || '',
        lname: user?.lname || '',
        mail: user?.mail || ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await updateProfile(formData);
            if (result.success) {
                showAlert('اطلاعات با موفقیت به روز شد', 'success');
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در ارتباط با سرور', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        نام
                    </label>
                    <input
                        type="text"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        نام خانوادگی
                    </label>
                    <input
                        type="text"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        ایمیل
                    </label>
                    <input
                        type="email"
                        name="mail"
                        value={formData.mail}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        شماره تلفن
                    </label>
                    <input
                        type="text"
                        value={user?.phoneNumber || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-right"
                        disabled
                    />
                    <p className="text-xs text-gray-500 mt-1 text-right">
                        برای تغییر شماره تلفن از بخش "تغییر شماره" استفاده کنید
                    </p>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 flex items-center gap-2"
                >
                    {loading && <LoadingSpinner size="sm" />}
                    {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                </button>
            </div>
        </form>
    );
};

export default PersonalInfo;