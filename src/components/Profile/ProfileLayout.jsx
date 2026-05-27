import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import PersonalInfo from './PersonalInfo';
import ChangePhone from './ChangePhone';
import OrdersList from './OrdersList';
import DeleteAccount from './DeleteAccount';
import AlertMessage from '../Common/AlertMessage';

const ProfileLayout = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('personal');
    const [alert, setAlert] = useState({ message: '', type: '' });

    const tabs = [
        { id: 'personal', label: 'اطلاعات شخصی', icon: '👤' },
        { id: 'orders', label: 'سفارشات', icon: '📦' },
        { id: 'changePhone', label: 'تغییر شماره', icon: '📱' },
        { id: 'deleteAccount', label: 'حذف حساب', icon: '🗑️' }
    ];

    const showAlert = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => setAlert({ message: '', type: '' }), 5000);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'personal':
                return <PersonalInfo user={user} showAlert={showAlert} />;
            case 'orders':
                return <OrdersList showAlert={showAlert} />;
            case 'changePhone':
                return <ChangePhone user={user} showAlert={showAlert} />;
            case 'deleteAccount':
                return <DeleteAccount showAlert={showAlert} />;
            default:
                return <PersonalInfo user={user} showAlert={showAlert} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">پروفایل کاربری</h1>
                            <p className="text-gray-600 mt-1">
                                {user?.fname} {user?.lname} | {user?.phoneNumber}
                            </p>
                        </div>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                            خروج
                        </button>
                    </div>
                </div>

                {/* Alert */}
                {alert.message && (
                    <AlertMessage message={alert.message} type={alert.type} />
                )}

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex flex-wrap">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-3 text-sm font-medium transition-colors flex items-center gap-2
                                        ${activeTab === tab.id
                                            ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <span>{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileLayout;