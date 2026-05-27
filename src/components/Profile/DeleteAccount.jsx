import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const DeleteAccount = ({ showAlert }) => {
    const { deleteAccount } = useAuth();
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmText, setConfirmText] = useState('');

    const handleDeleteAccount = async () => {
        if (confirmText !== 'حذف') {
            showAlert('لطفاً برای تایید، کلمه "حذف" را وارد کنید', 'error');
            return;
        }

        setLoading(true);
        try {
            const result = await deleteAccount();
            if (result.success) {
                showAlert('حساب کاربری با موفقیت حذف شد', 'success');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                showAlert(result.message, 'error');
                setShowConfirm(false);
            }
        } catch (error) {
            showAlert('خطا در حذف حساب کاربری', error);
        } finally {
            setLoading(false);
        }
    };

    if (!showConfirm) {
        return (
            <div className="text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h3 className="text-xl font-bold text-red-800 mb-2">هشدار!</h3>
                    <p className="text-red-700 mb-4">
                        حذف حساب کاربری غیرقابل بازگشت است.
                        تمام اطلاعات شما از جمله سفارشات و اطلاعات شخصی برای همیشه حذف خواهد شد.
                    </p>
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        حذف حساب کاربری
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-red-800 mb-4 text-right">
                    تایید نهایی حذف حساب
                </h3>
                
                <p className="text-gray-700 mb-4 text-right">
                    برای تایید حذف حساب کاربری، کلمه <strong className="text-red-600">"حذف"</strong> را در کادر زیر وارد کنید.
                </p>

                <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="کلمه حذف را وارد کنید"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-center"
                    disabled={loading}
                />

                <div className="flex gap-3">
                    <button
                        onClick={handleDeleteAccount}
                        disabled={loading}
                        className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? <LoadingSpinner size="sm" /> : 'بله، حذف شود'}
                    </button>
                    <button
                        onClick={() => setShowConfirm(false)}
                        disabled={loading}
                        className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        انصراف
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;