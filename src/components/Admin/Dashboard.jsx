import React, { useState, useEffect } from 'react';
import adminApi from '../../api/adminApi';
import LoadingSpinner from '../Common/LoadingSpinner';
import { ChartNoAxesCombined, DollarSign, ListOrdered, ShoppingBasket, Timer, TriangleAlert, User } from 'lucide-react';

const Dashboard = ({ showAlert }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const result = await adminApi.getDashboardStats();
            if (result.success) {
                setStats(result.data);
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در دریافت آمار', error);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    const statCards = [
        { title: 'کل محصولات', value: stats?.totalProducts || 0, icon: <ShoppingBasket size={38} />, color: 'bg-blue-500' },
        { title: 'کل کاربران', value: stats?.totalUsers || 0, icon: <User size={38}/>, color: 'bg-green-500' },
        { title: 'کل سفارشات', value: stats?.totalOrders || 0, icon: <ListOrdered size={38}/>, color: 'bg-purple-500' },
        { title: 'کل فروش', value: formatPrice(stats?.totalSales || 0), icon: <DollarSign size={38}/>, color: 'bg-yellow-500' },
        { title: 'سفارشات در انتظار', value: stats?.processingOrders || 0, icon: <Timer size={38}/>, color: 'bg-orange-500' },
        { title: 'فروش ماه جاری', value: formatPrice(stats?.monthlySales || 0), icon: <ChartNoAxesCombined size={38} />, color: 'bg-teal-500' }
    ];

    return (
        <div>
            <h2 className="text-xl font-bold mb-6 text-right">داشبورد مدیریت</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border">
                        <div className="flex items-center p-4">
                            <div className={`${card.color} text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl`}>
                                {card.icon}
                            </div>
                            <div className="mr-4 text-right">
                                <p className="text-gray-500 text-sm">{card.title}</p>
                                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Low Stock Alert */}
            {stats?.lowStockProducts?.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="flex gap-2 items-center text-lg font-bold text-yellow-800 mb-3 text-right"><TriangleAlert color='orange' /> هشدار موجودی کم</h3>
                    <div className="space-y-2">
                        {stats.lowStockProducts.map(product => (
                            <div key={product.id} className="flex justify-between items-center bg-white rounded p-3">
                                <span className="font-medium">{product.pname}</span>
                                <span className="text-red-600 font-bold">موجودی: {product.stock}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;