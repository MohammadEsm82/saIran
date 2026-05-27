import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Dashboard from './Dashboard';
import ProductsManagement from './ProductsManagement';
import OrdersManagement from './OrdersManagement';
import PodcastManagement from './PodcastManagement';
import AlertMessage from '../Common/AlertMessage';
import { Podcast } from 'lucide-react';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [alert, setAlert] = useState({ message: '', type: '' });

    const tabs = [
        { id: 'dashboard', label: 'داشبورد', icon: '📊' },
        { id: 'products', label: 'مدیریت محصولات', icon: '📦' },
        { id: 'orders', label: 'مدیریت سفارشات', icon: '📋' },
        { id: 'podcasts', label: 'مدیریت پادکست‌ها', icon: <Podcast /> }
    ];

    const showAlert = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => setAlert({ message: '', type: '' }), 5000);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard showAlert={showAlert} />;
            case 'products':
                return <ProductsManagement showAlert={showAlert} />;
            case 'orders':
                return <OrdersManagement showAlert={showAlert} />;
            case 'podcasts':
                return <PodcastManagement showAlert={showAlert} />;
            default:
                return <Dashboard showAlert={showAlert} />;
        }
    };

    if (!user?.isAdmin) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="text-6xl mb-4">⛔</div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">دسترسی غیرمجاز</h2>
                    <p className="text-gray-600">شما به این صفحه دسترسی ندارید</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">پنل مدیریت</h1>
                        <p className="text-sm text-gray-600">
                            خوش آمدید {user?.fname} {user?.lname}
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                        خروج
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-6">
                {alert.message && (
                    <AlertMessage message={alert.message} type={alert.type} />
                )}

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex">
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
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;