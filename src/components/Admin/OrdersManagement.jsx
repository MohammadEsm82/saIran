import React, { useState, useEffect } from 'react';
import adminApi from '../../api/adminApi';
import LoadingSpinner from '../Common/LoadingSpinner';

const OrdersManagement = ({ showAlert }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const result = await adminApi.getAllOrders(page, 20);
            if (result.success) {
                if (page === 1) {
                    setOrders(result.data.orders);
                } else {
                    setOrders(prev => [...prev, ...result.data.orders]);
                }
                setHasMore(result.data.orders.length === 20);
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در دریافت سفارشات', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'processing' ? 'completed' : 'processing';
        const statusText = newStatus === 'completed' ? 'تکمیل شده' : 'در حال پردازش';
        
        if (window.confirm(`آیا از تغییر وضعیت سفارش به "${statusText}" مطمئن هستید؟`)) {
            try {
                const result = await adminApi.updateOrderStatus(id, newStatus);
                if (result.success) {
                    showAlert('وضعیت سفارش با موفقیت تغییر کرد', 'success');
                    fetchOrders();
                    if (selectedOrder && selectedOrder.id === id) {
                        handleViewOrder(id);
                    }
                } else {
                    showAlert(result.message, 'error');
                }
            } catch (error) {
                showAlert('خطا در تغییر وضعیت', error);
            }
        }
    };

    const handleViewOrder = async (id) => {
        try {
            const result = await adminApi.getOrderDetails(id);
            if (result.success) {
                setSelectedOrder(result.data);
            } else {
                showAlert(result.message, 'error');
            }
        } catch (error) {
            showAlert('خطا در دریافت جزئیات سفارش', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'processing':
                return 'در حال پردازش';
            case 'completed':
                return 'تکمیل شده';
            default:
                return status;
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('fa-IR');
    };

    if (loading && orders.length === 0) {
        return <LoadingSpinner />;
    }

    if (selectedOrder) {
        return (
            <div>
                <button
                    onClick={() => setSelectedOrder(null)}
                    className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
                >
                    ← بازگشت به لیست سفارشات
                </button>

                <div className="bg-gray-50 rounded-lg p-6">
                    <div className="border-b pb-4 mb-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    سفارش #{selectedOrder.id}
                                </h3>
                                <p className="text-gray-600 mt-1">
                                    تاریخ: {formatDate(selectedOrder.createdAt)}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                                    {getStatusText(selectedOrder.status)}
                                </span>
                                <button
                                    onClick={() => handleUpdateStatus(selectedOrder.id, selectedOrder.status)}
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                                >
                                    تغییر وضعیت
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* اطلاعات کاربر */}
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <h4 className="font-bold mb-2 text-right">اطلاعات مشتری</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <p><strong>نام:</strong> {selectedOrder.user?.fname} {selectedOrder.user?.lname}</p>
                            <p><strong>شماره تلفن:</strong> {selectedOrder.user?.phoneNumber}</p>
                            <p><strong>ایمیل:</strong> {selectedOrder.user?.mail}</p>
                        </div>
                    </div>

                    {/* لیست محصولات */}
                    <h4 className="font-bold mb-3 text-right">محصولات سفارش</h4>
                    <div className="space-y-3">
                        {selectedOrder.products?.map((item, index) => (
                            <div key={index} className="flex justify-between items-center border-b pb-3">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="font-medium">{item.productName}</p>
                                        <p className="text-sm text-gray-500">
                                            تعداد: {item.quantity} | قیمت واحد: {formatPrice(item.price)}
                                        </p>
                                    </div>
                                </div>
                                <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                        ))}
                    </div>

                    {/* جمع کل */}
                    <div className="mt-6 pt-4 border-t">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">جمع کل:</span>
                            <span className="text-xl font-bold text-blue-600">
                                {formatPrice(selectedOrder.totalPrice)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-6 text-right">مدیریت سفارشات</h2>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">شماره سفارش</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">مشتری</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">محصولات</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">مبلغ کل</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">وضعیت</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">تاریخ</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">عملیات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">#{order.id}</td>
                                <td className="px-4 py-3 text-sm">
                                    {order.fname} {order.lname}
                                    <br />
                                    <span className="text-xs text-gray-500">{order.phoneNumber}</span>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <div className="space-y-1">
                                        {order.products?.slice(0, 2).map((item, idx) => (
                                            <div key={idx} className="text-sm">
                                                {item.productName} × {item.quantity}
                                            </div>
                                        ))}
                                        {order.products?.length > 2 && (
                                            <div className="text-xs text-gray-500">
                                                + {order.products.length - 2} محصول دیگر
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm font-bold">{formatPrice(order.totalPrice)}</td>
                                <td className="px-4 py-3 text-sm">
                                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                                        {getStatusText(order.status)}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm">{formatDate(order.createdAt)}</td>
                                <td className="px-4 py-3 text-sm">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleViewOrder(order.id)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            مشاهده
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(order.id, order.status)}
                                            className="text-green-600 hover:text-green-800"
                                        >
                                            تغییر وضعیت
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {hasMore && (
                <div className="text-center mt-6">
                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        بارگذاری بیشتر
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrdersManagement;