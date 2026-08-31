import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import authApi from '../../api/authApi';
import LoadingSpinner from '../Common/LoadingSpinner';
import AlertMessage from '../Common/AlertMessage';

const Login = () => {
    const { login } = useAuth();
    const [step, setStep] = useState('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [isNewUser, setIsNewUser] = useState(false);
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        mail: ''
    });

    const showAlert = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => setAlert({ message: '', type: '' }), 5000);
    };

    const handleSendOtp = async () => {
        if (!phoneNumber || phoneNumber.length !== 11) {
            showAlert('شماره تلفن معتبر نیست', 'error');
            return;
        }

        setLoading(true);
        try {
            const result = await authApi.sendOtp(phoneNumber);
            if (result.success) {
                setIsNewUser(result.data.isNewUser);
                setStep('code');
                showAlert('کد تایید ارسال شد', 'success');
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در ارسال کد', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        if (!code || code.length !== 6) {
            showAlert('کد تایید معتبر نیست', 'error');
            return;
        }

        setLoading(true);
        const loginData = { phoneNumber, code };
        
        if (isNewUser) {
            if (!formData.fname || !formData.lname || !formData.mail) {
                showAlert('لطفاً تمام اطلاعات را وارد کنید', 'error');
                setLoading(false);
                return;
            }
            loginData.fname = formData.fname;
            loginData.lname = formData.lname;
            loginData.mail = formData.mail;
        }
        
        try {
            const result = await login(loginData);
            if (result.success) {
                showAlert('ورود موفقیت آمیز', 'success');
                setTimeout(() => {
                    window.location.href = '/profile';
                }, 1000);
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در ورود', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        {step === 'phone' ? 'ورود / ثبت نام' : 'تایید کد'}
                    </h2>
                    <p className="text-gray-600 mt-2">
                        {step === 'phone' 
                            ? 'شماره تلفن خود را وارد کنید' 
                            : 'کد تایید ارسال شده را وارد کنید'}
                    </p>
                </div>

                {alert.message && (
                    <AlertMessage message={alert.message} type={alert.type} />
                )}

                {step === 'phone' ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                شماره تلفن
                            </label>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="09123456789"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center"
                                dir="ltr"
                                maxLength={11}
                            />
                        </div>

                        <button
                            onClick={handleSendOtp}
                            disabled={loading}
                            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                        >
                            {loading ? <LoadingSpinner size="sm" /> : 'ارسال کد تایید'}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {isNewUser && (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                        نام
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.fname}
                                        onChange={(e) => setFormData({...formData, fname: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right"
                                        placeholder="علی"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                        نام خانوادگی
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.lname}
                                        onChange={(e) => setFormData({...formData, lname: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right"
                                        placeholder="رضایی"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                        ایمیل
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.mail}
                                        onChange={(e) => setFormData({...formData, mail: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right"
                                        placeholder="mehdimosleh@example.com"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                                کد تایید
                            </label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="123456"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center"
                                dir="ltr"
                                maxLength={6}
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400"
                        >
                            {loading ? <LoadingSpinner size="sm" /> : 'تایید و ورود'}
                        </button>

                        <button
                            onClick={() => setStep('phone')}
                            className="w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            بازگشت
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;