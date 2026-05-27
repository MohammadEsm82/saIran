import React, { useState } from 'react';
import authApi from '../../api/authApi';
import LoadingSpinner from '../Common/LoadingSpinner';

const ChangePhone = ({ user, showAlert }) => {
    const [step, setStep] = useState('request'); // request, verify
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [tempToken, setTempToken] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRequestChange = async () => {
        if (!newPhoneNumber || newPhoneNumber.length !== 11) {
            showAlert('شماره تلفن معتبر نیست', 'error');
            return;
        }

        if (newPhoneNumber === user?.phoneNumber) {
            showAlert('شماره جدید با شماره فعلی یکسان است', 'warning');
            return;
        }

        setLoading(true);
        try {
            const result = await authApi.requestPhoneChange(newPhoneNumber);
            if (result.success) {
                setTempToken(result.data.tempToken);
                setStep('verify');
                showAlert('کد تایید به شماره جدید ارسال شد', 'success');
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در ارسال کد', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCode || verificationCode.length !== 6) {
            showAlert('کد تایید معتبر نیست', 'error');
            return;
        }

        setLoading(true);
        try {
            const result = await authApi.confirmPhoneChange(tempToken, verificationCode);
            if (result.success) {
                showAlert('شماره تلفن با موفقیت تغییر کرد', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در تایید کد', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setStep('request');
        setNewPhoneNumber('');
        setTempToken('');
        setVerificationCode('');
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 text-right">
                    شماره تلفن فعلی: <strong>{user?.phoneNumber}</strong>
                </p>
            </div>

            {step === 'request' ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            شماره تلفن جدید
                        </label>
                        <input
                            type="tel"
                            value={newPhoneNumber}
                            onChange={(e) => setNewPhoneNumber(e.target.value)}
                            placeholder="مثال: 09123456789"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center"
                            dir="ltr"
                            maxLength={11}
                        />
                        <p className="text-xs text-gray-500 mt-1 text-right">
                            کد تایید به این شماره ارسال خواهد شد
                        </p>
                    </div>

                    <button
                        onClick={handleRequestChange}
                        disabled={loading}
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? <LoadingSpinner size="sm" /> : 'ارسال کد تایید'}
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                            کد تایید 6 رقمی
                        </label>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="کد دریافتی را وارد کنید"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center"
                            dir="ltr"
                            maxLength={6}
                        />
                        <p className="text-xs text-gray-500 mt-1 text-right">
                            کد به شماره {newPhoneNumber} ارسال شد
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleVerifyCode}
                            disabled={loading}
                            className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400"
                        >
                            {loading ? <LoadingSpinner size="sm" /> : 'تایید و تغییر شماره'}
                        </button>
                        <button
                            onClick={handleReset}
                            disabled={loading}
                            className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            بازگشت
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangePhone;